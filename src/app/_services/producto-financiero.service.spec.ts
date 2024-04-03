import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProductoFinancieroService } from './producto-financiero.service';

describe('ProductoFinancieroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProductoFinancieroService]
    });
  });
  it('should create', inject([ProductoFinancieroService], (service: ProductoFinancieroService) => {
    expect(service);
  }));
});
