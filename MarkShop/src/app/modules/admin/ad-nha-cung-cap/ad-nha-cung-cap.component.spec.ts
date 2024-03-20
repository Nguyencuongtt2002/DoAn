import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdNhaCungCapComponent } from './ad-nha-cung-cap.component';

describe('AdNhaCungCapComponent', () => {
  let component: AdNhaCungCapComponent;
  let fixture: ComponentFixture<AdNhaCungCapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdNhaCungCapComponent]
    });
    fixture = TestBed.createComponent(AdNhaCungCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
