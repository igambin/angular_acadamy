import { TestBed, inject } from '@angular/core/testing';

import { MessageDataService } from './message-data.service';

describe('MessageDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageDataService]
    });
  });

  it('should be created', inject([MessageDataService], (service: MessageDataService) => {
    expect(service).toBeTruthy();
  }));
});
