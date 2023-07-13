import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarEquipoComponent } from './buscar-equipo.component';

describe('BuscarEquipoComponent', () => {
  let component: BuscarEquipoComponent;
  let fixture: ComponentFixture<BuscarEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarEquipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
