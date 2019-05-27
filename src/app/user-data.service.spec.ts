import {async, TestBed} from '@angular/core/testing';

import { UserDataService } from './user-data.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {
  MatButtonModule,
  MatCardModule, MatDialog,
  MatDialogModule, MatDialogRef, MatGridList, MatGridTile,
  MatIconModule,
  MatInputModule, MatList, MatListItem, MatRippleModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {BsTableModule} from 'es-ng6-bs4-table';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ToastrModule} from 'ng6-toastr-notifications';
import {AgmCoreModule} from '@agm/core';
import {AppComponent} from './app.component';
import {HelpIconComponent} from './help-icon/help-icon.component';
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

describe('UserDataService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        MatTableModule,
        AppRoutingModule,
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
        HelpIconComponent,
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
      ],
      providers: [
        MatDialog,
        {provide: MatDialogRef, useValue: {}}
      ],
    })
      .compileComponents();
  }));

  it('should be created', () => {
    const service: UserDataService = TestBed.get(UserDataService);
    expect(service).toBeTruthy();
  });

  it('should support clearing previous saved data', () => {
    const service: UserDataService = TestBed.get(UserDataService);
    expect(service.clear).toBeTruthy();
  });

  it('should support setting new given data', () => {
    const service: UserDataService = TestBed.get(UserDataService);
    expect(service.setData).toBeTruthy();
  });

  it('should support adding of new custom location', () => {
    const service: UserDataService = TestBed.get(UserDataService);
    expect(service.setNewMarker).toBeTruthy();
  });

  it('should support setting comment for location', () => {
    const service: UserDataService = TestBed.get(UserDataService);
    expect(service.setComment).toBeTruthy();
  });

  it('should support returning the comments that are given for new locations', () => {
    const service: UserDataService = TestBed.get(UserDataService);
    expect(service.getComment).toBeTruthy();
  });

  it('should support returning event emitter for data changes', () => {
    const service: UserDataService = TestBed.get(UserDataService);
    expect(service.getDataChangeEmitter).toBeTruthy();
  });

  it('should support returning the new inserted marker', () => {
    const service: UserDataService = TestBed.get(UserDataService);
    expect(service.getNewMarker).toBeTruthy();
  });

  it('should support adding marker locally without backend', () => {
    const service: UserDataService = TestBed.get(UserDataService);
    expect(service.addMarkerLocally).toBeTruthy();
  });

  it('should support returning the current used theme', () => {
    const service: UserDataService = TestBed.get(UserDataService);
    expect(service.addMarkerLocally).toBeTruthy();
  });

  it('should support deleting a location from the list', () => {
    const service: UserDataService = TestBed.get(UserDataService);
    expect(service.deleteLocation).toBeTruthy();
  });

  it('should support setting new theme', () => {
    const service: UserDataService = TestBed.get(UserDataService);
    expect(service.setNewTheme).toBeTruthy();
  });

  it('should support returning the token that was given on login', () => {
    const service: UserDataService = TestBed.get(UserDataService);
    expect(service.getToken).toBeTruthy();
  });
});
