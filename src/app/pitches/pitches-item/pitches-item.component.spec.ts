import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchesItemComponent } from './pitches-item.component';

describe('PitchesItemComponent', () => {
  let component: PitchesItemComponent;
  let fixture: ComponentFixture<PitchesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitchesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
