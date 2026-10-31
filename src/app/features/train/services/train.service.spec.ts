import { TestBed } from '@angular/core/testing';

import { TrainService } from './train.service';

describe('Train', () => {
  let service: TrainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
