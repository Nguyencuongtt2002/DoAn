import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdGioiThieuComponent } from './ad-gioi-thieu.component';

describe('AdGioiThieuComponent', () => {
  let component: AdGioiThieuComponent;
  let fixture: ComponentFixture<AdGioiThieuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdGioiThieuComponent]
    });
    fixture = TestBed.createComponent(AdGioiThieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
