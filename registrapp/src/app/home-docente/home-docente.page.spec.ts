import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeDocentePage } from './home-docente.page';

describe('HomeDocentePage', () => {
  let component: HomeDocentePage;
  let fixture: ComponentFixture<HomeDocentePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
