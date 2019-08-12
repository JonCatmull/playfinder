import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(@Inject(PLATFORM_ID) private platformId: any) {  }

  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

}
