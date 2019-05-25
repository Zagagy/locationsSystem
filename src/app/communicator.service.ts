import { Injectable } from '@angular/core';
import {Router} from "@angular/router"
import {UserDataService} from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {

  constructor(private router: Router, private userDataService: UserDataService) { }

  login(loginData: any) {
    this.userDataService.setData(loginData['username'],'','');
    if (loginData['username'] === 'ben') {
      this.router.navigate(['/main']);
    }
  }

  logout() {

  }

  newLocationAdded() {

  }

  locationRemoved(deletedRowCandidate: number) {

  }

  ThemeUpdated() {

  }
}
