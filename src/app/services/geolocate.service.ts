import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const GeoLocationErrors = ['Permission Denied', 'Position Unavailable', 'Timeout'];

@Injectable({
  providedIn: 'root'
})
export class GeolocateService {

  readonly position$: Subject<Position> = new Subject();

  constructor() { }

  /**
   * Attempt to access geolocation browser API
   * and then update position$ Subject.
   */
  locate() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.position$.next(position);
        },
        error => {
          console.log(GeoLocationErrors[error.code]);
          this.position$.error(GeoLocationErrors[error.code]);
        }
      );
    } else {
      console.log('Geolocation is not supported');
      this.position$.error('Geolocation is not supported');
    }
  }
}
