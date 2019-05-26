import {Input, Component, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {CommunicatorService} from '../communicator.service';
import {HelpService} from '../help.service';
import {DialogsService} from '../dialogs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private communicator: CommunicatorService, private helpService: HelpService, private dialogsService: DialogsService) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if ((this.form.valid) && (this.form.value.username !== '') && (this.form.value.password !== '')) {
      this.communicator.login(this.form.value);
    } else {
      this.dialogsService.showErrorToast('Please type valid username and password before proceeding');
    }
  }
}
