import { Injectable } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ConfigurationComponent} from './configuration/configuration.component';
import {ToastrManager} from 'ng6-toastr-notifications';
import {InsertCommentComponent} from './insert-comment/insert-comment.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(private dialog: MatDialog, private toastr: ToastrManager) { }

  public openConfigurationDialog() {

    const dialogConfig = this.getDialogConfig(1);
    this.dialog.open(ConfigurationComponent, dialogConfig);
  }

  public openCommentsDialog() {

    const dialogConfig = this.getDialogConfig(2);
    this.dialog.open(InsertCommentComponent, dialogConfig);
  }

  public openDeleteMarkerDialog() {
    const dialogConfig = this.getDialogConfig(3);
    this.dialog.open(ConfirmDialogComponent, dialogConfig);
  }

  openHelpDialog() {
    const dialogConfig = this.getDialogConfig(4);
    this.dialog.open(ConfigurationComponent, dialogConfig);
  }

  private getDialogConfig(idForConfig) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: idForConfig,
      title: 'anc'
    };
    return dialogConfig;
  }

  public showInfoToast(content) {
    this.toastr.infoToastr(content, null, {position: 'top-center', animate : 'slideFromTop', enableHTML: true, toastTimeout : 3000});
  }
  public showSucessToast(content) {
    this.toastr.successToastr(content, null, {position: 'top-center', animate : 'slideFromTop', enableHTML: true, toastTimeout : 3000});
  }
  public showErrorToast(content) {
    this.toastr.errorToastr(content, null, {position: 'top-center', animate : 'slideFromTop', enableHTML: true, toastTimeout : 3000});
  }
}
