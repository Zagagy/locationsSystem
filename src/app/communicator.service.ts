import {Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserDataService} from './user-data.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastrManager} from 'ng6-toastr-notifications';
import {CONFIGURATIONS} from '../environments/configurations';
import {Observable} from 'rxjs';

export interface PostRepsonse {
  isSuccess: boolean;
  content: any;
  token: string;
  isIdledAndLoggedOut : boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {
  backendURL = 'http://' + CONFIGURATIONS.host + ':' + CONFIGURATIONS.port + '/';
  constructor(private router: Router,
              private userDataService: UserDataService,
              private httpClient: HttpClient,
              private toastr: ToastrManager) {}

  login(loginData: any) {
    const currBrowser = this.getBrowser();
    const  params = {username : loginData.username, password : loginData.password, browser: currBrowser};
    this.httpClient.post<PostRepsonse>(this.backendURL + 'login',  params).subscribe(data  => {
          if (data.isSuccess) {
            this.userDataService.setData(loginData.username, data.content, data.token);
            this.router.navigate(['/main']);
          } else  {
            this.failedLoginMsg();
          }
        },
        error  => {
          this.failedLoginMsg();
        }

      );
  }

  logout() {
    const  params = {token : this.userDataService.getToken()};
    this.httpClient.post<PostRepsonse>(this.backendURL + 'logout',  params).subscribe(data  => {
      this.toastr.successToastr('You are not logged out of the system', null
        , {position: 'top-center', animate : 'slideFromTop', enableHTML: true, toastTimeout : 3000});
    });

  }

  newLocationAdded(location) {
    this.postRequest(location, 'insert', 'New Location', 'added');
  }

  locationRemoved(deletedRowCandidate) {
    this.postRequest(deletedRowCandidate, 'remove', 'Removed Location', 'deleted');
  }

  ThemeUpdated() {
    this.postRequest(this.userDataService.getTheme(), 'updateTheme', 'Custom Theme', 'updated');
  }

  postRequest(dataToSend, pathKey, subject, action) {
    const  params = {token : this.userDataService.getToken(), data: dataToSend};
    this.httpClient.post<PostRepsonse>(this.backendURL + pathKey,  params).subscribe(data  => {
        if (data.isIdledAndLoggedOut) {
          this.handleIdleLoggedOut();
          return;
        }

        if (data.isSuccess) {
          this.dbUpdatedSuccessfullyMsg(subject, action);
        } else  {
          this.failedSavingInDBMsg();
        }
      },
      error  => {
        this.failedSavingInDBMsg();
      });
  }

  handleIdleLoggedOut() {
    this.toastr.errorToastr('You have been idle for more than an hour - please log in again in order to continue',
      null, {position: 'top-center', animate: 'slideFromTop', enableHTML: true, toastTimeout: 5000});
    this.router.navigate(['/logout']);
  }

  dbUpdatedSuccessfullyMsg(subject, action) {
    const msg = subject + ' was Successfully ' + action + '.';
    this.toastr.successToastr(msg, 'Success!'
      , {position: 'top-center', animate : 'slideFromTop', enableHTML: true, toastTimeout : 3000});
  }

  failedLoginMsg() {
    this.toastr.errorToastr('Login Failed, either Username or Password are NOT correct',
      null, {position: 'top-center', animate : 'slideFromTop', enableHTML: true, toastTimeout : 3000});
  }

  failedSavingInDBMsg() {
    this.toastr.errorToastr('Cannot update Data on the cloud, Please contact the helpdesk for further information',
      null, {position: 'top-center', animate : 'slideFromTop', enableHTML: true, toastTimeout : 3000});
  }

  getBrowser() {
    let browser = 'other';
    const currWindow: any = window;
    const agent = currWindow.navigator.userAgent.toLowerCase();

    switch (true) {
      case agent.indexOf('edge') > -1:
        browser = 'edge';
        break;
      case agent.indexOf('opr') > -1 && !!currWindow.opr:
        browser =  'opera';
        break;
      case agent.indexOf('chrome') > -1 && !!currWindow.chrome:
        browser = 'chrome';
        break;
      case agent.indexOf('trident') > -1:
        browser = 'ie';
        break;
      case agent.indexOf('firefox') > -1:
        browser = 'firefox';
        break;
      case agent.indexOf('safari') > -1:
        browser = 'safari';
        break;
      default:
        browser = 'other';
        break;
    }

    return browser;
  }
}
