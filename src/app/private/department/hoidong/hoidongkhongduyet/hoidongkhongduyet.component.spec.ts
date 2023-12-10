import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoidongkhongduyetComponent } from './hoidongkhongduyet.component';

describe('HoidongkhongduyetComponent', () => {
  let component: HoidongkhongduyetComponent;
  let fixture: ComponentFixture<HoidongkhongduyetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoidongkhongduyetComponent]
    });
    fixture = TestBed.createComponent(HoidongkhongduyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
