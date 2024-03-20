import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinTucComponent } from './tin-tuc.component';

describe('TinTucComponent', () => {
  let component: TinTucComponent;
  let fixture: ComponentFixture<TinTucComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TinTucComponent]
    });
    fixture = TestBed.createComponent(TinTucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
