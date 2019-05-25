import { Component, OnInit } from '@angular/core';
import {FlowService} from '../flow.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private flowService: FlowService) { }

  ngOnInit() {

  }

}
