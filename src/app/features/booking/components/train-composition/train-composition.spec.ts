import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainComposition } from './train-composition';

describe('TrainComposition', () => {
  let component: TrainComposition;
  let fixture: ComponentFixture<TrainComposition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainComposition],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainComposition);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
