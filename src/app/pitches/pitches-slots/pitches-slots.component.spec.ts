import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { PitchesSlotsComponent } from './pitches-slots.component';
import { PitchesService } from '../../services/pitches.service';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DayPilotModule } from 'daypilot-pro-angular';

describe('PitchesSlotsComponent', () => {
  let component: PitchesSlotsComponent;
  let fixture: ComponentFixture<PitchesSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule, CommonModule, ReactiveFormsModule, HttpClientModule, MaterialModule,
        DayPilotModule, MatNativeDateModule ],
      declarations: [ PitchesSlotsComponent ],
      providers: [ PitchesService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchesSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
