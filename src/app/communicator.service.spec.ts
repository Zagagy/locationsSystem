import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { CommunicatorService } from './communicator.service';
import {HttpClientModule} from '@angular/common/http';
import {ToastrManager, ToastrModule} from 'ng6-toastr-notifications';
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
import {BsTableModule} from 'es-ng6-bs4-table';
import {FlexLayoutModule} from '@angular/flex-layout';
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



describe('CommunicatorService', () => {
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
    const service: CommunicatorService = TestBed.get(CommunicatorService);
    expect(service).toBeTruthy();
  });

  it('should have a login function to call the backend with', () => {
    const service: CommunicatorService = TestBed.get(CommunicatorService);
    expect(service.login).toBeTruthy();
  });

  it('should have a logout function to call the backend with', () => {
    const service: CommunicatorService = TestBed.get(CommunicatorService);
    expect(service.logout).toBeTruthy();
  });

  it('should have a newLocationAdded function to call the backend with', () => {
    const service: CommunicatorService = TestBed.get(CommunicatorService);
    expect(service.newLocationAdded).toBeTruthy();
  });

  it('should have a locationRemoved function to call the backend with', () => {
    const service: CommunicatorService = TestBed.get(CommunicatorService);
    expect(service.locationRemoved).toBeTruthy();
  });

  it('should have a ThemeUpdated function to call the backend with', () => {
    const service: CommunicatorService = TestBed.get(CommunicatorService);
    expect(service.ThemeUpdated).toBeTruthy();
  });

  it('should have a handleIdleLoggedOut function to run on the frontend', () => {
    const service: CommunicatorService = TestBed.get(CommunicatorService);
    expect(service.handleIdleLoggedOut).toBeTruthy();
  });

  it('should have a dbUpdatedSuccessfullyMsg function to show msgs to the user', () => {
    const service: CommunicatorService = TestBed.get(CommunicatorService);
    expect(service.dbUpdatedSuccessfullyMsg).toBeTruthy();
  });

  it('should have a failedLoginMsg function to show msgs to the user', () => {
    const service: CommunicatorService = TestBed.get(CommunicatorService);
    expect(service.failedLoginMsg).toBeTruthy();
  });

  it('should have a failedSavingInDBMsg function to show msgs to the user', () => {
    const service: CommunicatorService = TestBed.get(CommunicatorService);
    expect(service.failedSavingInDBMsg).toBeTruthy();
  });
  it('should have a getBrowser function to be able to send the browser type to the backend', () => {
    const service: CommunicatorService = TestBed.get(CommunicatorService);
    expect(service.getBrowser).toBeTruthy();
  });
});
