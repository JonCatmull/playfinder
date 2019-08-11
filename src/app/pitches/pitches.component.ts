import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { PitchesService } from '../services/pitches.service';

@Component({
  selector: 'pf-pitches',
  templateUrl: './pitches.component.html',
  styleUrls: ['./pitches.component.scss']
})
export class PitchesComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(public pitchesService: PitchesService, private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({});
    this.secondFormGroup = this._formBuilder.group({
      chosenSport: ['', Validators.required]
    });

    this.secondFormGroup.get('chosenSport').valueChanges
      .subscribe(sport => {
        this.pitchesService.setFilter('sport', sport);
      });

    this.pitchesService.loadPitches();
  }

}
