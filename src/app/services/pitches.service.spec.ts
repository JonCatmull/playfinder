import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { PitchesService } from './pitches.service';

describe('PitchesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: PitchesService = TestBed.get(PitchesService);
    expect(service).toBeTruthy();
  });
});
