import { TestBed } from '@angular/core/testing';

import { FigurinesService } from './figurines.service';

describe('FigurinesService', () => {
  let service: FigurinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FigurinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
