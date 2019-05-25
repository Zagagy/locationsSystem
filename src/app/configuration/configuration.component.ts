import { Component, OnInit } from '@angular/core';
import {UserDataService} from '../user-data.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {StylesService} from '../styles.service';
import {Router} from '@angular/router';
import {CommunicatorService} from '../communicator.service';
import {HelpService} from '../help.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  private theme = 'standard';

  constructor(private userDataService: UserDataService, private dialogRef: MatDialogRef<ConfirmDialogComponent>,
              private stylesService: StylesService, private communicatorService: CommunicatorService, private helpService: HelpService) {
    this.theme = this.userDataService.getTheme();
  }

  ngOnInit() {
  }

  form: FormGroup = new FormGroup({
    confirm: new FormControl('')
  });

  setTheme(themeName) {
    this.theme = themeName;
  }

  apply() {
    this.userDataService.setNewTheme(this.theme);
    this.communicatorService.ThemeUpdated();
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
