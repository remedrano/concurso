import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoConcursoComponent } from './catalogo-concurso.component';

describe('CatalogoConcursoComponent', () => {
  let component: CatalogoConcursoComponent;
  let fixture: ComponentFixture<CatalogoConcursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoConcursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoConcursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
