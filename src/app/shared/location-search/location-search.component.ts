import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

import { GeolocateService } from '../../services/geolocate.service';

@Component({
  selector: 'pf-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit {
  locationControl = new FormControl();
  locationOptions: string[] = ['London', 'Manchester', 'Brighton', 'Dublin', 'Luton'];
  filteredOptions: Observable<string[]>;

  @Output() locationChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(public geolocateService: GeolocateService) {}

  ngOnInit() {
    // Listen to input, emit change events and filter options.
    this.filteredOptions = this.locationControl.valueChanges
      .pipe(
        startWith(''),
        tap(value => this.locationChange.emit(value)),
        map(value => this._filterOptions(value))
      );

    // Listen for geolocation results and apply to input
    this.geolocateService.position$.subscribe(position => {
      this.locationControl.setValue(`${position.coords.latitude},${position.coords.longitude}`);
    });
  }

  /**
   * Filter autocomplete locationOptions based on string
   */
  private _filterOptions(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.locationOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
}
