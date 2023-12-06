import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [HttpClientModule]
    })
    service = TestBed.inject(ApiService);
  });

  it('Existencia del servicio', () => {
    expect(service).toBeTruthy();
  })

});