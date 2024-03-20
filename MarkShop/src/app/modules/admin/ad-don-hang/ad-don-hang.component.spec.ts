import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdDonHangComponent } from './ad-don-hang.component';

describe('AdDonHangComponent', () => {
  let component: AdDonHangComponent;
  let fixture: ComponentFixture<AdDonHangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdDonHangComponent]
    });
    fixture = TestBed.createComponent(AdDonHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
