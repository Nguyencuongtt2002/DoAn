import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdLoaispComponent } from './ad-loaisp.component';

describe('AdLoaispComponent', () => {
  let component: AdLoaispComponent;
  let fixture: ComponentFixture<AdLoaispComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdLoaispComponent]
    });
    fixture = TestBed.createComponent(AdLoaispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
