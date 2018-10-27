import { TestBed, inject } from '@angular/core/testing';

import { MinuteTimerService } from './minute-timer.service';

describe('MinuteTimerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MinuteTimerService]
    });
  });

  it('should be created', inject([MinuteTimerService], (service: MinuteTimerService) => {
    expect(service).toBeTruthy();
  }));
});
