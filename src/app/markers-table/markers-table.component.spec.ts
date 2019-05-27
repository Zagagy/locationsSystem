import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkersTableComponent } from './markers-table.component';
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
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {MapComponent} from '../map/map.component';
import {ToolbarComponent} from '../toolbar/toolbar.component';
import {LogoutComponent} from '../logout/logout.component';
import {ConfigurationComponent} from '../configuration/configuration.component';
import {InsertLocationComponent} from '../insert-location/insert-location.component';
import {MainComponent} from '../main/main.component';
import {InsertCommentComponent} from '../insert-comment/insert-comment.component';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

describe('MarkersTableComponent', () => {
  let component: MarkersTableComponent;
  let fixture: ComponentFixture<MarkersTableComponent>;


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
    fixture = TestBed.createComponent(MarkersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an option to export the table data', () => {
    expect(component.exportData).toBeTruthy();
  });

  it('should have an option to apply filter on the content', () => {
    expect(component.applyFilter).toBeTruthy();
  });

  it('should have a valid data source for the table', () => {
    expect(component.dataSource).toBeTruthy();
  });

  it('should have valid columns definition', () => {
    expect(component.displayedColumns).toBeTruthy();
  });

  it('should have a number column in the table', () => {
    expect(component.displayedColumns.indexOf('num') !== -1).toBeTruthy();
  });

  it('should have a longitude column in the table', () => {
    expect(component.displayedColumns.indexOf('longitude') !== -1).toBeTruthy();
  });

  it('should have a latitude column in the table', () => {
    expect(component.displayedColumns.indexOf('latitude') !== -1).toBeTruthy();
  });

  it('should have a comment column in the table', () => {
    expect(component.displayedColumns.indexOf('comment') !== -1).toBeTruthy();
  });

  it('should have a delete column in the table', () => {
    expect(component.displayedColumns.indexOf('delete') !== -1).toBeTruthy();
  });

  it('should be able to delete rows from the table', () => {
    expect(component.deleteRow).toBeTruthy();
  });
});
