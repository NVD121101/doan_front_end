import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BieudoComponent } from './bieudo.component';

describe('BieudoComponent', () => {
  let component: BieudoComponent;
  let fixture: ComponentFixture<BieudoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BieudoComponent]
    });
    fixture = TestBed.createComponent(BieudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
