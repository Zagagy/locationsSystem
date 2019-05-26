import {EventEmitter, Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userName: string;
  private markers;
  private customComment = '';
  private token = '';
  private customMarker;
  private selectedTheme = 'standard';
  private dataChange: EventEmitter<number> = new EventEmitter();
  constructor(private router: Router) {
  }

  public getUserName() {
    return this.userName;
  }

  public getMarkers() {
    return this.markers;
  }

  clear() {
    this.userName = '';
    this.customComment = '';
    this.markers = [];
  }

  setData(userName, content, token) {
    this.userName = userName;
    this.markers = content.locations;
    this.selectedTheme = content.theme;
    this.token = token;
  }

  setNewMarker(isSet: boolean, lng: any, lat: any) {
    if (isSet) {
      this.customMarker = {longitude: lng, latitude: lat};
    } else {
      this.customMarker = undefined;
    }
  }

  setComment(comment) {
    this.customComment = comment;
  }

  getComment() {
    return this.customComment;
  }

  getDataChangeEmitter() {
    return this.dataChange;
  }

  getNewMarker() {
    let newLocationData: any;
    if (this.customMarker) {
      newLocationData = {
        longitude: this.customMarker.longitude, latitude: this.customMarker.latitude,
        comment: this.customComment
      };
    }
    return newLocationData;
  }

  addMarkerLocally(newLocationData) {
    this.markers.push(newLocationData);
    this.dataChange.emit(this.markers);
  }

  getTheme() {
    return this.selectedTheme;
  }

  deleteLocation(rowToDelete: number) {
    debugger;
    let location = this.markers.splice(rowToDelete, 1);
    this.dataChange.emit(this.markers);
    return location;
  }

  setNewTheme(theme: any) {
    this.selectedTheme = theme;
  }

  getToken() {
    return this.token;
  }
}
