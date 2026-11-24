import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationStage } from './confirmation-stage';

describe('ConfirmationStage', () => {
  let component: ConfirmationStage;
  let fixture: ComponentFixture<ConfirmationStage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationStage],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationStage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
