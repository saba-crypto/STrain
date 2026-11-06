import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainPage } from './train-page';

describe('TrainPage', () => {
  let component: TrainPage;
  let fixture: ComponentFixture<TrainPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
