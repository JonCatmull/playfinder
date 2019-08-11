import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ApiService } from './api.service';
import { Pitch } from '../models/pitch';
import { Venue } from '../models/venue';

// Move this
const initialFiltersState: Map<string, string> = new Map([
  ['location', 'London'],
  ['sport', 'cricket'],
  ['radius',''], // '5mi'
  ['start', ''],
  ['end', '']
]);

@Injectable({
  providedIn: 'root'
})
export class PitchesService extends ApiService {

  endpoint = 'pitches';
  page = 1;
  sportOptions = ['football', 'space hire', 'rugby', 'hockey', 'athletics', 'swimming', 'gym', 'gaa', 'basketball',
    'tennis', 'volleyball', 'netball', 'golf', 'badminton', 'cricket', 'table tennis', 'futsal', 'squash', 'esports'];
  venues: Map<number, Venue> = new Map();
  filters$ = new BehaviorSubject(initialFiltersState);
  pitches$: BehaviorSubject<Pitch[]> = new BehaviorSubject([]);

  constructor(public http: HttpClient) {
    super(http);
  }

  /**
   * Set a filter on the filters$ observable.
   * @param key string filter name.
   * @param value filter value.
   */
  setFilter(key: string, value: string) {
    const filters = this.filters$.getValue().set(key, value);

    this.filters$.next(new Map([...filters]));
  }

  /**
   * Takes a Map of filters and adds them to a HttpParams then returns it.
   * If no HttpParams object is passed in then one is created
   * @param filters Map of filters to add
   * @param params Optional Params object.
   */
  mapFiltersToParams(filters: Map<string, string>, params = new HttpParams()) {
    filters.forEach((value, key) => {
      if (value) {
        params = params.append(`filter[${key}]`, String(value));
      }
    });
    return params;
  }

  /**
   * Get pitches observable.
   * Optional params for pagination
   */
  getPitches(page = 1, pageSize = 20) {

    let params: HttpParams = new HttpParams();
    params = params.append('page[number]', page.toString());
    params = params.append('page[size]', pageSize.toString());
    // params = params.append('sort', 'relevance');
    params = params.append('include', 'venues');

    return this.filters$
      .pipe(
        map(filters => this.mapFiltersToParams(filters, params)),
        switchMap(_params => this.findAll({params: _params}))
      );
  }

  /**
   * Get pitch by Id.
   * Includes venue data.
   */
  getPitch(id: number) {

    let params: HttpParams = new HttpParams();
    params = params.append('include', 'venues');

    return this.find(id, {params});
  }

  /**
   * Adds corresponding full venue data into pitch relationship
   */
  interpolateVenuesWithPitches(venues: Map<number, Venue>, pitches: Pitch[]) {
    return pitches.map(pitch => {
      pitch.relationships.venues.data = venues.get(pitch.relationships.venues.data.id);
      return pitch;
    });
  }

  /**
   * Get pitches from API then store included venues. Passes new values to pitches$ subject.
   */
  loadPitches(page = this.page) {
    this.getPitches(page)
      .subscribe(resp => {
        let pitches: Pitch[] = resp.data;
        const newVenues = resp.included;

        if (newVenues) {
          // Add new venues to Venue Map if not already there
          this.venues = new Map([...this.venues, ...newVenues.map((venue: Venue) => [venue.id, venue])]);
          pitches = this.interpolateVenuesWithPitches(this.venues, pitches);
        }

        this.pitches$.next(pitches);
      });
  }

  /**
   * Load a Pitches slots from API filtered by start and end date.
   * Start and end must be 14 days max difference.
   * @param pitchId The pitch ID to be queried
   * @param start Only show slots on this date or after
   * @param end Only show slots before or on this date
   */
  getSlots(pitchId: number, start: Date, end: Date) {

    const filters = new Map([['starts', this.formattedDate(start)], ['ends', this.formattedDate(end)]]);
    const params = this.mapFiltersToParams(filters);

    return this.get(`${pitchId}/slots`, {params});
  }

  /**
   * Method to combine address details into string
   */
  venueAddress(venue: Venue) {
    return `${venue.attributes.address1}, ${venue.attributes.address2}, ${venue.attributes.town}, ${venue.attributes.postcode}`;
  }

  /**
   * Takes a Date object and returns as "yyyy-mm-dd"
   * @param date Date to format
   */
  formattedDate(date: Date) {
    const twoDigits = num => ('0' + num).slice(-2);
    return `${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(date.getDate())}`;
  }




  // ***** Temporary methods for Scraping API ******

  // pluckSports = pitches => pitches.map(pitch => pitch.attributes.sport);

  // getUniqueSports(sports: string[]) {
  //   return [...new Set(sports)];
  // }

  // startSportsScrape() {

  //   let allSports: string[] = [];

  //   const pages = interval(5000);

  //   const take20Pages = pages.pipe(take(30));

  //   take20Pages
  //     .pipe(
  //       switchMap(i => this.getPitches(i + 1)),
  //       pluck('data'),
  //       map(this.pluckSports),
  //       map(sports => this.getUniqueSports(sports))
  //     )
  //     .subscribe(sports => {
  //       allSports = this.getUniqueSports([...allSports, ...sports]);
  //       console.log(allSports);
  //     });
  // }
}
