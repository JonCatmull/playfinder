import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, pluck, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PitchesService } from '../../services/pitches.service';
import { Pitch } from '../../models/pitch';
import { Venue } from '../../models/venue';

@Component({
  selector: 'pf-pitches-item',
  templateUrl: './pitches-item.component.html',
  styleUrls: ['./pitches-item.component.scss']
})
export class PitchesItemComponent implements OnInit {

  activePitch$: Observable<Pitch>;
  activeVenue$: Observable<Venue>;

  constructor(public route: ActivatedRoute, public pitchesService: PitchesService) { }

  ngOnInit() {

    const activeData$ = this.route.params
      .pipe(
        filter(params => params.id),
        switchMap(params => this.pitchesService.getPitch(+params.id))
      );

    this.activePitch$ = activeData$
      .pipe(
        pluck('data')
      );

    this.activeVenue$ = activeData$
      .pipe(
        map(resp => resp.included[0])
      );
  }

}
