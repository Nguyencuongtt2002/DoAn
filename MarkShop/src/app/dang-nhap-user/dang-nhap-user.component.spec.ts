import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangNhapUserComponent } from './dang-nhap-user.component';

describe('DangNhapUserComponent', () => {
  let component: DangNhapUserComponent;
  let fixture: ComponentFixture<DangNhapUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DangNhapUserComponent]
    });
    fixture = TestBed.createComponent(DangNhapUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
