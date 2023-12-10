import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinhvienbaovethanhcongComponent } from './sinhvienbaovethanhcong.component';

describe('SinhvienbaovethanhcongComponent', () => {
  let component: SinhvienbaovethanhcongComponent;
  let fixture: ComponentFixture<SinhvienbaovethanhcongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinhvienbaovethanhcongComponent]
    });
    fixture = TestBed.createComponent(SinhvienbaovethanhcongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
