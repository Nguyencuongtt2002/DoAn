import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSanPhamComponent } from './ad-san-pham.component';

describe('AdSanPhamComponent', () => {
  let component: AdSanPhamComponent;
  let fixture: ComponentFixture<AdSanPhamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdSanPhamComponent]
    });
    fixture = TestBed.createComponent(AdSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
