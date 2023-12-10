import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemgiangvienComponent } from './themgiangvien.component';

describe('ThemgiangvienComponent', () => {
  let component: ThemgiangvienComponent;
  let fixture: ComponentFixture<ThemgiangvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemgiangvienComponent]
    });
    fixture = TestBed.createComponent(ThemgiangvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
