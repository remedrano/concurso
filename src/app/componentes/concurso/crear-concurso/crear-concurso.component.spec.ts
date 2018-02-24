import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearConcursoComponent } from './crear-concurso.component';

describe('CrearConcursoComponent', () => {
  let component: CrearConcursoComponent;
  let fixture: ComponentFixture<CrearConcursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearConcursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearConcursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
