import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateStage } from './date-stage';

describe('DateStage', () => {
  let component: DateStage;
  let fixture: ComponentFixture<DateStage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateStage],
    }).compileComponents();

    fixture = TestBed.createComponent(DateStage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
