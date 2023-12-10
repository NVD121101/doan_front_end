import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoidongdaduyetComponent } from './hoidongdaduyet.component';

describe('HoidongdaduyetComponent', () => {
  let component: HoidongdaduyetComponent;
  let fixture: ComponentFixture<HoidongdaduyetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoidongdaduyetComponent]
    });
    fixture = TestBed.createComponent(HoidongdaduyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
