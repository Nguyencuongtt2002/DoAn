import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdAnhComponent } from './ad-anh.component';

describe('AdAnhComponent', () => {
  let component: AdAnhComponent;
  let fixture: ComponentFixture<AdAnhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdAnhComponent]
    });
    fixture = TestBed.createComponent(AdAnhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
