import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaidaduyetComponent } from './detaidaduyet.component';

describe('DetaidaduyetComponent', () => {
  let component: DetaidaduyetComponent;
  let fixture: ComponentFixture<DetaidaduyetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetaidaduyetComponent]
    });
    fixture = TestBed.createComponent(DetaidaduyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
