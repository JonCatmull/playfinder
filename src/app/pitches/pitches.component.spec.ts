import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchesComponent } from './pitches.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
// import { DayPilotModule } from 'daypilot-pro-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('PitchesComponent', () => {
  let component: PitchesComponent;
  let fixture: ComponentFixture<PitchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterModule,
        HttpClientModule,
        CommonModule,
        SharedModule,
        MaterialModule,
        // DayPilotModule,
        ReactiveFormsModule
      ],
      declarations: [ PitchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
