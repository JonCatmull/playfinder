import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { PitchesItemComponent } from './pitches-item.component';
import { PitchesService } from 'src/app/services/pitches.service';
import { of } from 'rxjs';
import { PitchesSlotsComponent } from '../pitches-slots/pitches-slots.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DayPilotModule } from 'daypilot-pro-angular';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('PitchesItemComponent', () => {
  let component: PitchesItemComponent;
  let fixture: ComponentFixture<PitchesItemComponent>;

  const fakeActivatedRoute = { params: of({ id: 1 }) };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        CommonModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        DayPilotModule
      ],
      declarations: [ PitchesItemComponent, PitchesSlotsComponent ],
      providers: [ PitchesService, Location ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
