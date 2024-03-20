import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdLienHeComponent } from './ad-lien-he.component';

describe('AdLienHeComponent', () => {
  let component: AdLienHeComponent;
  let fixture: ComponentFixture<AdLienHeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdLienHeComponent]
    });
    fixture = TestBed.createComponent(AdLienHeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
