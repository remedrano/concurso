import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeConcursoComponent } from './home-concurso.component';

describe('HomeConcursoComponent', () => {
  let component: HomeConcursoComponent;
  let fixture: ComponentFixture<HomeConcursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeConcursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeConcursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
