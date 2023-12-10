import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuyethoidongComponent } from './duyethoidong.component';

describe('DuyethoidongComponent', () => {
  let component: DuyethoidongComponent;
  let fixture: ComponentFixture<DuyethoidongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuyethoidongComponent]
    });
    fixture = TestBed.createComponent(DuyethoidongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
