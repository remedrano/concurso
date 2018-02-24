import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarConcursoComponent } from './editar-concurso.component';

describe('EditarConcursoComponent', () => {
  let component: EditarConcursoComponent;
  let fixture: ComponentFixture<EditarConcursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarConcursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarConcursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
