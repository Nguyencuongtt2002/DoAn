import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSizeComponent } from './ad-size.component';

describe('AdSizeComponent', () => {
  let component: AdSizeComponent;
  let fixture: ComponentFixture<AdSizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdSizeComponent]
    });
    fixture = TestBed.createComponent(AdSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
