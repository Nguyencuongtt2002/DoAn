import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSlideComponent } from './ad-slide.component';

describe('AdSlideComponent', () => {
  let component: AdSlideComponent;
  let fixture: ComponentFixture<AdSlideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdSlideComponent]
    });
    fixture = TestBed.createComponent(AdSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
