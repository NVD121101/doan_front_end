import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachbomonComponent } from './danhsachbomon.component';

describe('DanhsachbomonComponent', () => {
  let component: DanhsachbomonComponent;
  let fixture: ComponentFixture<DanhsachbomonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DanhsachbomonComponent]
    });
    fixture = TestBed.createComponent(DanhsachbomonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
