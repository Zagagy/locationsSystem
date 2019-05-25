import { Component, OnInit } from '@angular/core';
import {FlowService} from '../flow.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private flowService: FlowService) { }

  ngOnInit() {
    this.flowService.verifyNavigationAllowed();
  }
}
