import { TestBed } from '@angular/core/testing';

import { FlowService } from './flow.service';
import {BrowserModule} from '@angular/platform-browser';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule, MatGridList, MatGridTile,
  MatIconModule,
  MatInputModule, MatList, MatListItem, MatRippleModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {BsTableModule} from 'es-ng6-bs4-table';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ToastrModule} from 'ng6-toastr-notifications';
import {AgmCoreModule} from '@agm/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MapComponent} from './map/map.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {LogoutComponent} from './logout/logout.component';
import {ConfigurationComponent} from './configuration/configuration.component';
import {MarkersTableComponent} from './markers-table/markers-table.component';
import {InsertLocationComponent} from './insert-location/insert-location.component';
import {MainComponent} from './main/main.component';
import {InsertCommentComponent} from './insert-comment/insert-comment.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {HelpIconComponent} from './help-icon/help-icon.component';

describe('FlowService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      BrowserModule,
      MatTableModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatCardModule,
      MatInputModule,
      MatButtonModule,
      MatToolbarModule,
      MatDialogModule,
      MatIconModule,
      HttpClientModule,
      BsTableModule,
      FlexLayoutModule,
      HttpClientModule,
      ToastrModule.forRoot(),
      MatRippleModule,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCwsm3hN2hyNuHFipWaPzrQDX24VWlouzY'
      })
    ],
    declarations: [
      AppComponent,
      LoginComponent,
      RegisterComponent,
      MapComponent,
      ToolbarComponent,
      LogoutComponent,
      ConfigurationComponent,
      MarkersTableComponent,
      MatList,
      MatListItem,
      InsertLocationComponent,
      MatGridList,
      MatGridTile,
      MainComponent,
      InsertCommentComponent,
      ConfirmDialogComponent,
      HelpIconComponent
    ],
  }));


  it('should be created', () => {
    const service: FlowService = TestBed.get(FlowService);
    expect(service).toBeTruthy();
  });

  it('should support reset marker selection', () => {
    const service: FlowService = TestBed.get(FlowService);
    expect(service.resetMarkerSelection).toBeTruthy();
  });

  it('should support getting the focused marker', () => {
    const service: FlowService = TestBed.get(FlowService);
    expect(service.getFocusMarkerEvent).toBeTruthy();
  });

  it('should support logout flow', () => {
    const service: FlowService = TestBed.get(FlowService);
    expect(service.logout).toBeTruthy();
  });

  it('should support login flow', () => {
    const service: FlowService = TestBed.get(FlowService);
    expect(service.login).toBeTruthy();
  });

  it('should verify Navigation is Allowed', () => {
    const service: FlowService = TestBed.get(FlowService);
    expect(service.verifyNavigationAllowed).toBeTruthy();
  });

  it('should get the Marker State', () => {
    const service: FlowService = TestBed.get(FlowService);
    expect(service.getMarkerSelectionState).toBeTruthy();
  });

  it('should be able to set the Marker State', () => {
    const service: FlowService = TestBed.get(FlowService);
    expect(service.setMarkerSelectionState).toBeTruthy();
  });

  it('should be able to check the Marker State event', () => {
    const service: FlowService = TestBed.get(FlowService);
    expect(service.checkMarkerSelectionState).toBeTruthy();
  });

  it('should be able to raise the Marker State event', () => {
    const service: FlowService = TestBed.get(FlowService);
    expect(service.raiseMarkerSelectionEvent).toBeTruthy();
  });

  it('should be able to support delete location flow', () => {
    const service: FlowService = TestBed.get(FlowService);
    expect(service.setDeleteRowCandidate).toBeTruthy();
  });

  it('should be able to support handling flow following confirmation', () => {
    const service: FlowService = TestBed.get(FlowService);
    expect(service.AfterConfirmDialog).toBeTruthy();
  });
});
