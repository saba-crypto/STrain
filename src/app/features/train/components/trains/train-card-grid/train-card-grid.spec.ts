import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainCardGrid } from './train-card-grid';

describe('TrainCardGrid', () => {
  let component: TrainCardGrid;
  let fixture: ComponentFixture<TrainCardGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainCardGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainCardGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
