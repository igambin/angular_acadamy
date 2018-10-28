import { TestBed, inject } from '@angular/core/testing';

import { SecondTimerService } from './second-timer.service';

describe('SecondTimerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecondTimerService]
    });
  });

  it('should be created', inject([SecondTimerService], (service: SecondTimerService) => {
    expect(service).toBeTruthy();
  }));
});
