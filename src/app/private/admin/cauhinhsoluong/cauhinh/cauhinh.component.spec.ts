import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CauhinhComponent } from './cauhinh.component';

describe('CauhinhComponent', () => {
  let component: CauhinhComponent;
  let fixture: ComponentFixture<CauhinhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CauhinhComponent]
    });
    fixture = TestBed.createComponent(CauhinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
