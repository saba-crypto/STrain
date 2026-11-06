import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TrainInfoDashboard } from './train-info-dashboard';

describe('TrainInfoDashboard', () => {
  let component: TrainInfoDashboard;
  let fixture: ComponentFixture<TrainInfoDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainInfoDashboard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainInfoDashboard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('train', {
      id: 1,
      number: 1,
      name: 'Test train',
      thumbnail: 'test.jpg',
      coachesCount: 5,
      totalSeats: 300,
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
