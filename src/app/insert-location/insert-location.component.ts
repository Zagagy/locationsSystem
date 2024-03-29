import { Component, OnInit } from '@angular/core';
import {FlowService, MarkerSelectionState} from '../flow.service';
import {CommunicatorService} from '../communicator.service';
import {DialogsService} from '../dialogs.service';
import {UserDataService} from '../user-data.service';
import {StylesService} from '../styles.service';
import {HelpService} from '../help.service';

@Component({
  selector: 'app-insert-location',
  templateUrl: './insert-location.component.html',
  styleUrls: ['./insert-location.component.css']
})
export class InsertLocationComponent implements OnInit {
  constructor(private flowService: FlowService, private communicator: CommunicatorService,
              private dialogsService: DialogsService,
              private userDataService: UserDataService,
              private stylesService: StylesService,
              private helpService: HelpService) { }

  ngOnInit() {
  }

  start() {
    if (this.flowService.getMarkerSelectionState() === MarkerSelectionState.READY) {
      this.flowService.setMarkerSelectionState(MarkerSelectionState.BEFORE_MARKER_SELECTED);
      this.dialogsService.showInfoToast('Select Your desired location on the nap');
    }
  }

  reset() {
    this.flowService.resetMarkerSelection();
  }

  addComments() {
    this.dialogsService.openCommentsDialog();
  }

  save() {
    if (this.flowService.getMarkerSelectionState() === MarkerSelectionState.AFTER_MARKER_SELECTED) {
      const newLocation = this.userDataService.getNewMarker();
      this.communicator.newLocationAdded(newLocation);
      this.reset();
      this.userDataService.addMarkerLocally(newLocation);
    }
  }
}
