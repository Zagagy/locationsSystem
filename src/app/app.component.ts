  import { Component } from '@angular/core';
  import {FlowService} from './flow.service';

  @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wintego';

  constructor(private flowService: FlowService) { }
}
