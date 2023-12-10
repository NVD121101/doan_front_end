import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThembomonComponent } from './thembomon.component';

describe('ThembomonComponent', () => {
  let component: ThembomonComponent;
  let fixture: ComponentFixture<ThembomonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThembomonComponent]
    });
    fixture = TestBed.createComponent(ThembomonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
