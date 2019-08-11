import { TestBed } from '@angular/core/testing';

import { PitchesService } from './pitches.service';

describe('PitchesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PitchesService = TestBed.get(PitchesService);
    expect(service).toBeTruthy();
  });
});
