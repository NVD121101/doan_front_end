import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoluongsinhvienhdpbComponent } from './soluongsinhvienhdpb.component';

describe('SoluongsinhvienhdpbComponent', () => {
  let component: SoluongsinhvienhdpbComponent;
  let fixture: ComponentFixture<SoluongsinhvienhdpbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoluongsinhvienhdpbComponent]
    });
    fixture = TestBed.createComponent(SoluongsinhvienhdpbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
