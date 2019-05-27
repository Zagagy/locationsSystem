import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
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
import {AppRoutingModule} from '../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {BsTableModule} from 'es-ng6-bs4-table';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ToastrModule} from 'ng6-toastr-notifications';
import {AgmCoreModule} from '@agm/core';
import {AppComponent} from '../app.component';
import {HelpIconComponent} from '../help-icon/help-icon.component';
import {RegisterComponent} from '../register/register.component';
import {MapComponent} from '../map/map.component';
import {ToolbarComponent} from '../toolbar/toolbar.component';
import {LogoutComponent} from '../logout/logout.component';
import {ConfigurationComponent} from '../configuration/configuration.component';
import {MarkersTableComponent} from '../markers-table/markers-table.component';
import {InsertLocationComponent} from '../insert-location/insert-location.component';
import {MainComponent} from '../main/main.component';
import {InsertCommentComponent} from '../insert-comment/insert-comment.component';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;


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

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form', () => {
    expect(component.form).toBeTruthy();
  });

  it('should be able to submit', () => {
    expect(component.submit).toBeTruthy();
  });
});
