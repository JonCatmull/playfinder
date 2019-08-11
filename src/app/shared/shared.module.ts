import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationSearchComponent } from './location-search/location-search.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LocationSearchComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [LocationSearchComponent]
})
export class SharedModule { }
