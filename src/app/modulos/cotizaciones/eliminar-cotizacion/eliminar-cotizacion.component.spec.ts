import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCotizacionComponent } from './eliminar-cotizacion.component';

describe('EliminarCotizacionComponent', () => {
  let component: EliminarCotizacionComponent;
  let fixture: ComponentFixture<EliminarCotizacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarCotizacionComponent]
    });
    fixture = TestBed.createComponent(EliminarCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
