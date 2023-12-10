import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaikhongdatComponent } from './detaikhongdat.component';

describe('DetaikhongdatComponent', () => {
  let component: DetaikhongdatComponent;
  let fixture: ComponentFixture<DetaikhongdatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetaikhongdatComponent]
    });
    fixture = TestBed.createComponent(DetaikhongdatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
