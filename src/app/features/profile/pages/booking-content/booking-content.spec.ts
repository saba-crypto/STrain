import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingContent } from './booking-content';

describe('BookingContent', () => {
  let component: BookingContent;
  let fixture: ComponentFixture<BookingContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingContent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
