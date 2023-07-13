import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarEquipoComponent } from './eliminar-equipo.component';

describe('EliminarEquipoComponent', () => {
  let component: EliminarEquipoComponent;
  let fixture: ComponentFixture<EliminarEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarEquipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
