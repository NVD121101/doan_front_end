import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachgiangvienComponent } from './danhsachgiangvien.component';

describe('DanhsachgiangvienComponent', () => {
  let component: DanhsachgiangvienComponent;
  let fixture: ComponentFixture<DanhsachgiangvienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DanhsachgiangvienComponent]
    });
    fixture = TestBed.createComponent(DanhsachgiangvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
