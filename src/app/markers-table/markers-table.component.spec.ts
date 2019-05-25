import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkersTableComponent } from './markers-table.component';

describe('MarkersTableComponent', () => {
  let component: MarkersTableComponent;
  let fixture: ComponentFixture<MarkersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkersTableComponent ]
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
});
