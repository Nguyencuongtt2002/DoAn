import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdThamSoComponent } from './ad-tham-so.component';

describe('AdThamSoComponent', () => {
  let component: AdThamSoComponent;
  let fixture: ComponentFixture<AdThamSoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdThamSoComponent]
    });
    fixture = TestBed.createComponent(AdThamSoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
