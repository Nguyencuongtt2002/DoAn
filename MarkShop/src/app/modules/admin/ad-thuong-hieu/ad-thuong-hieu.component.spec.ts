import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdThuongHieuComponent } from './ad-thuong-hieu.component';

describe('AdThuongHieuComponent', () => {
  let component: AdThuongHieuComponent;
  let fixture: ComponentFixture<AdThuongHieuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdThuongHieuComponent]
    });
    fixture = TestBed.createComponent(AdThuongHieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
