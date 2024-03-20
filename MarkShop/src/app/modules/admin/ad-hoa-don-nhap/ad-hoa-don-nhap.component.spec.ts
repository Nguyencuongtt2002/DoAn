import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdHoaDonNhapComponent } from './ad-hoa-don-nhap.component';

describe('AdHoaDonNhapComponent', () => {
  let component: AdHoaDonNhapComponent;
  let fixture: ComponentFixture<AdHoaDonNhapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdHoaDonNhapComponent]
    });
    fixture = TestBed.createComponent(AdHoaDonNhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
