import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoachStage } from './coach-stage';

describe('CoachStage', () => {
  let component: CoachStage;
  let fixture: ComponentFixture<CoachStage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachStage],
    }).compileComponents();

    fixture = TestBed.createComponent(CoachStage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
