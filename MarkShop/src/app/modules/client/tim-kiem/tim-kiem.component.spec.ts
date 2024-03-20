import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimKiemComponent } from './tim-kiem.component';

describe('TimKiemComponent', () => {
  let component: TimKiemComponent;
  let fixture: ComponentFixture<TimKiemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimKiemComponent]
    });
    fixture = TestBed.createComponent(TimKiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
