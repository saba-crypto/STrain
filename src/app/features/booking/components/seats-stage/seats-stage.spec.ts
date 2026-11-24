import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeatsStage } from './seats-stage';

describe('SeatsStage', () => {
  let component: SeatsStage;
  let fixture: ComponentFixture<SeatsStage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatsStage],
    }).compileComponents();

    fixture = TestBed.createComponent(SeatsStage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
