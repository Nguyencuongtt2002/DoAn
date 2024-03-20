import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangNhapAdminComponent } from './dang-nhap-admin.component';

describe('DangNhapAdminComponent', () => {
  let component: DangNhapAdminComponent;
  let fixture: ComponentFixture<DangNhapAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DangNhapAdminComponent]
    });
    fixture = TestBed.createComponent(DangNhapAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
