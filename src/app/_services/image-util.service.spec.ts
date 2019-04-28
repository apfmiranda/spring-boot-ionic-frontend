import { TestBed } from '@angular/core/testing';

import { ImageUtilService } from './image-util.service';

describe('ImageUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageUtilService = TestBed.get(ImageUtilService);
    expect(service).toBeTruthy();
  });
});
