import { Component, OnInit } from '@angular/core';
import {UserDataService} from '../user-data.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-insert-comment',
  templateUrl: './insert-comment.component.html',
  styleUrls: ['./insert-comment.component.css']
})
export class InsertCommentComponent implements OnInit {
  content = '';
  constructor(private userDataService: UserDataService, private dialogRef: MatDialogRef<InsertCommentComponent>) {
    this.content = this.userDataService.getComment();
  }

  form: FormGroup = new FormGroup({
    comment: new FormControl('')
  });


  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  apply() {
    this.userDataService.setComment(this.content);
    this.dialogRef.close();
  }
}
