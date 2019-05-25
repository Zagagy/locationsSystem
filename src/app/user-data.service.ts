import {EventEmitter, Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userName: string;
  private markers;
  private customComment = '';
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

  setData(userName,markers,conf) {
    this.userName = userName;
    this.markers = [
      {longitude: '32.778919', latitude: '34.986706', comment: 'd1erdtgfterw53454qewfq34fdqwe4d23qdfqwdfqwerqweqdfqwe'},
      {longitude: '32.783649', latitude: '34.965015', comment: 'd2'},
      {longitude: '51.556023', latitude: '-0.279519', comment: 'd3'},
      {longitude: '53.463058', latitude: '-2.291340', comment: 'd4'},
      {longitude: '53.430935', latitude: '-2.960724', comment: 'd5'},
      {longitude: '53.430935', latitude: '-2.960724', comment: 'd6'}
    ];
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

  getNewMarker() {
    return this.customMarker;
  }

  getDataChangeEmitter() {
    return this.dataChange;
  }

  addCurrentMarker() {
    this.markers.push({longitude : this.customMarker.longitude, latitude : this.customMarker.latitude, comment: this.customComment});
    this.dataChange.emit(this.markers);
  }

  getTheme() {
    return this.selectedTheme;
  }

  deleteLocation(rowToDelete: number) {
    let location = this.markers.splice(rowToDelete, 1);
    this.dataChange.emit(this.markers);
    return location;
  }

  setNewTheme(theme: any) {
    this.selectedTheme = theme;
  }
}
