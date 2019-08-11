import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { DayPilotModule } from 'daypilot-pro-angular';
import { SharedModule } from '../shared/shared.module';
import { PitchesRoutingModule } from './pitches-routing.module';
import { PitchesComponent } from './pitches.component';
import { PitchesItemComponent } from './pitches-item/pitches-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PitchesSlotsComponent } from './pitches-slots/pitches-slots.component';


@NgModule({
  declarations: [PitchesComponent, PitchesItemComponent, PitchesSlotsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    DayPilotModule,
    ReactiveFormsModule,
    PitchesRoutingModule
  ],
  providers: [],
  entryComponents: []
})
export class PitchesModule { }
