import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PitchesComponent } from './pitches.component';
import { PitchesItemComponent } from './pitches-item/pitches-item.component';

const routes: Routes = [
  { path: '', component: PitchesComponent },
  { path: ':id', component: PitchesItemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PitchesRoutingModule { }
