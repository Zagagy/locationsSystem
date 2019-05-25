import { Component, OnInit } from '@angular/core';
import {FlowService} from '../flow.service';
import {UserDataService} from '../user-data.service';
import {DialogsService} from '../dialogs.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private flowService: FlowService, private userDataService: UserDataService, private dialogsService : DialogsService) {

  }

  ngOnInit() {
  }

  logout() {
    this.flowService.logout();
  }

  openConf() {
    this.dialogsService.openConfigurationDialog();
  }
}
