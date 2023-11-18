import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginAlPage } from './login-al.page';

describe('LoginAlPage', () => {
  let component: LoginAlPage;
  let fixture: ComponentFixture<LoginAlPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginAlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
