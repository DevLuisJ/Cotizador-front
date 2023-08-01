import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCotizacionComponent } from './buscar-cotizacion.component';

describe('BuscarCotizacionComponent', () => {
  let component: BuscarCotizacionComponent;
  let fixture: ComponentFixture<BuscarCotizacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarCotizacionComponent]
    });
    fixture = TestBed.createComponent(BuscarCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
