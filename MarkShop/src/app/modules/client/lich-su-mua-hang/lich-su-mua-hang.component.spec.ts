import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LichSuMuaHangComponent } from './lich-su-mua-hang.component';

describe('LichSuMuaHangComponent', () => {
  let component: LichSuMuaHangComponent;
  let fixture: ComponentFixture<LichSuMuaHangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LichSuMuaHangComponent]
    });
    fixture = TestBed.createComponent(LichSuMuaHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
