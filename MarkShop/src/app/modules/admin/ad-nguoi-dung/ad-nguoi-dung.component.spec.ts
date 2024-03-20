import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdNguoiDungComponent } from './ad-nguoi-dung.component';

describe('AdNguoiDungComponent', () => {
  let component: AdNguoiDungComponent;
  let fixture: ComponentFixture<AdNguoiDungComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdNguoiDungComponent]
    });
    fixture = TestBed.createComponent(AdNguoiDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
