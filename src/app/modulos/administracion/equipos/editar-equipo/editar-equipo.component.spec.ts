import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEquipoComponent } from './editar-equipo.component';

describe('EditarEquipoComponent', () => {
  let component: EditarEquipoComponent;
  let fixture: ComponentFixture<EditarEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEquipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
