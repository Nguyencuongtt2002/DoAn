import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XemChiTietComponent } from './xem-chi-tiet.component';

describe('XemChiTietComponent', () => {
  let component: XemChiTietComponent;
  let fixture: ComponentFixture<XemChiTietComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XemChiTietComponent]
    });
    fixture = TestBed.createComponent(XemChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
