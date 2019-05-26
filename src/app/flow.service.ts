import {EventEmitter, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CommunicatorService} from './communicator.service';
import {UserDataService} from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class FlowService {
  private markerSelectedState: MarkerSelectionState;
  private markerSelectionEvent: EventEmitter<number> = new EventEmitter();
  private deletedRowCandidate = -1;
  private lastAction = '';

  constructor(private router: Router, private communicator: CommunicatorService,
              private userDataService: UserDataService) {
    this.markerSelectedState = MarkerSelectionState.READY;
  }

  resetMarkerSelection() {
    this.setMarkerSelectionState(MarkerSelectionState.READY);
    this.userDataService.setNewMarker(false, 0, 0);
    this.userDataService.setComment('');
  }

  getFocusMarkerEvent() {
    return this.markerSelectionEvent;
  }

  public logout() {
    this.markerSelectedState = MarkerSelectionState.READY;
    this.communicator.logout();
    this.userDataService.clear();
    this.router.navigate(['/logout']);
  }

  public login() {
    this.router.navigate(['/']);
  }

  public verifyNavigationAllowed() {
    const userName = this.userDataService.getUserName();
    if (!userName || userName === '') {
      this.login();
    }
  }

  public getMarkerSelectionState() {
    return this.markerSelectedState;
  }

  public setMarkerSelectionState(state: MarkerSelectionState) {
    this.markerSelectedState = state;
  }

  public checkMarkerSelectionState(truthyState: string) {
    let retVal = false;
    switch (truthyState) {
      case 'READY':
        retVal = this.markerSelectedState === MarkerSelectionState.READY;
        break;
      case 'BEFORE_MARKER_SELECTED':
        retVal = this.markerSelectedState === MarkerSelectionState.BEFORE_MARKER_SELECTED;
        break;
      case 'AFTER_MARKER_SELECTED':
        retVal = this.markerSelectedState === MarkerSelectionState.AFTER_MARKER_SELECTED;
        break;
    }
    return retVal;
  }

  public raiseMarkerSelectionEvent(markerData: any) {
    this.markerSelectionEvent.emit(markerData);
  }

  setDeleteRowCandidate(index: any) {
    this.deletedRowCandidate = index;
  }

  AfterConfirmDialog(isConfirmed) {
    let location = [];
    let isRowDeleted = true;
    if (isConfirmed && (this.deletedRowCandidate !== -1)) {
      location = this.userDataService.deleteLocation(this.deletedRowCandidate);
    } else {
      isRowDeleted = false;
    }
    if (location.length > 0) {
      this.communicator.locationRemoved(location[0]);
    } else {
      isRowDeleted = false;
    }


    if (isRowDeleted) {
      this.deletedRowCandidate = -1;
    }

  }
}

export enum MarkerSelectionState {
  READY= 1,
  BEFORE_MARKER_SELECTED,
  AFTER_MARKER_SELECTED
}
