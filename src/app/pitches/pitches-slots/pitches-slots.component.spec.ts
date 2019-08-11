import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchesSlotsComponent } from './pitches-slots.component';

describe('PitchesSlotsComponent', () => {
  let component: PitchesSlotsComponent;
  let fixture: ComponentFixture<PitchesSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitchesSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchesSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
