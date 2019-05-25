import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {InsertCommentComponent} from '../insert-comment/insert-comment.component';
import {FlowService} from '../flow.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(private flowService: FlowService, private dialogRef: MatDialogRef<ConfirmDialogComponent>) { }
  form: FormGroup = new FormGroup({
    confirm: new FormControl('')
  });
  ngOnInit() {
  }

  apply() {
    this.flowService.AfterConfirmDialog(true);
    this.dialogRef.close();
  }

  cancel() {
    this.flowService.AfterConfirmDialog(false);
    this.dialogRef.close();
  }
}
