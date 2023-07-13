import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarCotizacionComponent } from './asignar-cotizacion.component';

describe('AsignarCotizacionComponent', () => {
  let component: AsignarCotizacionComponent;
  let fixture: ComponentFixture<AsignarCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarCotizacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
