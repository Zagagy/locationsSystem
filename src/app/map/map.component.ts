import {Component, OnInit} from '@angular/core';
import {FlowService, MarkerSelectionState} from '../flow.service';
import {UserDataService} from '../user-data.service';
import {DialogsService} from '../dialogs.service';
import {StylesService} from '../styles.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private markers;
  private newMarker;
  protected map: any;
  subscriptionForMapFocus;
  constructor(private userData: UserDataService,
              private flowService: FlowService,
              private dialogsService: DialogsService,
              private stylesService: StylesService) {
              }

  ngOnInit(): void {
    this.markers = this.userData.getMarkers();
    this.subscriptionForMapFocus = this.flowService.getFocusMarkerEvent()
      .subscribe(markerData => this.zoomMarker(markerData));
  }
  placeMarker($event: any) {
    if (this.flowService.getMarkerSelectionState() !== MarkerSelectionState.READY) {
      this.userData.setNewMarker(true, $event.coords.lng, $event.coords.lat);
      this.flowService.setMarkerSelectionState(MarkerSelectionState.AFTER_MARKER_SELECTED);
      this.dialogsService.showSucessToast('New location applied');
    }
  }

  protected mapReady(map) {
    this.map = map;
  }

  private zoomMarker(markerData: any) {
    if (this.map) {
      this.map.panTo(markerData);
      this.map.setZoom(8);
    }
  }
}
