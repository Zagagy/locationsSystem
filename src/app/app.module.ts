import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule, MatTableModule, MatListItem, MatList, MatRippleModule, MatGridList, MatGridTile,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MapComponent } from './map/map.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {LogoutComponent} from './logout/logout.component';
import {ConfigurationComponent} from './configuration/configuration.component';
import {MatDialogModule, MatDialog , MatDialogRef} from '@angular/material/dialog';
import {DialogsService} from './dialogs.service';
import {FlowService} from './flow.service';
import {CommunicatorService} from './communicator.service';
import {UserDataService} from './user-data.service';
import {MarkersTableComponent} from './markers-table/markers-table.component';
import {HttpClientModule} from '@angular/common/http';
import {BsTableModule} from 'es-ng6-bs4-table';
import {FlexLayoutModule} from '@angular/flex-layout';
import { InsertLocationComponent } from './insert-location/insert-location.component';
import { MainComponent } from './main/main.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import {InsertCommentComponent} from './insert-comment/insert-comment.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HelpIconComponent } from './help-icon/help-icon.component';

@NgModule({
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
    ToastrModule.forRoot(),
    MatRippleModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCwsm3hN2hyNuHFipWaPzrQDX24VWlouzY'
    })
  ],
  entryComponents: [
    ConfigurationComponent,
    InsertCommentComponent,
    ConfirmDialogComponent
  ],
  providers: [DialogsService, FlowService, CommunicatorService, UserDataService, {provide: MatDialogRef, useValue: {}}, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
