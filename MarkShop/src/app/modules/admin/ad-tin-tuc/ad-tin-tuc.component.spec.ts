import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdTinTucComponent } from './ad-tin-tuc.component';

describe('AdTinTucComponent', () => {
  let component: AdTinTucComponent;
  let fixture: ComponentFixture<AdTinTucComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdTinTucComponent]
    });
    fixture = TestBed.createComponent(AdTinTucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
