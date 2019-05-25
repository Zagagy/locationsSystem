import { Injectable } from '@angular/core';
import {ToastrManager} from 'ng6-toastr-notifications';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(private toastr: ToastrManager) { }


  public raiseHelp(section) {
    let msg = '';
    let header = '';
    switch (section) {
      case 'login':
        msg = 'Please type your username & password in order to login to the locations system.';
        header = 'System Login';
        break;
      case 'customize':
        msg = 'Select your Custom Application Theme by clicking on your desired theme\n following by the click of the Apply button.';
        header = 'Look & Feel Customization';
        break;
      case 'table':
        msg = 'Click on a location in the table in order to see it on the map, you can also Download all of your saved locations using the right export button.';
        header = 'Display & Download';
        break;
      case 'insertLocation':
        msg = 'In order to add new locations follow the instructions bellow.';
        header = 'Location Insertion';
        break;

        break;
    }
    if (msg !== '') {
      this.toastr.infoToastr(msg, header, {position: 'top-full-width', animate : 'slideFromTop', enableHTML: true});
    }

  }
}
