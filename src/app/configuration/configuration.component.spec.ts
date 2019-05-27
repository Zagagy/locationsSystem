import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationComponent } from './configuration.component';
import {HelpIconComponent} from '../help-icon/help-icon.component';
import {MatCardModule, MatDialog, MatDialogModule, MatDialogRef, MatIconModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ng6-toastr-notifications';

describe('ConfigurationComponent', () => {
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  let component: ConfigurationComponent;
  let fixture: ComponentFixture<ConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfigurationComponent,
        HelpIconComponent
      ],
      imports: [MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        RouterModule,
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        MatDialogModule],
      providers: [
        MatDialog,
        {provide: MatDialogRef, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form', () => {
    expect(component.form).toBeTruthy();
  });

  it('should have apply button', () => {
    expect(component.apply).toBeTruthy();
  });

  it('should have cancel button', () => {
    expect(component.cancel).toBeTruthy();
  });

  it('should be able to set theme', () => {
    expect(component.setTheme).toBeTruthy();
  });
});
