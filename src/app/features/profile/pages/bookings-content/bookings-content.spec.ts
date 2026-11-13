import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingsContent } from './bookings-content';

describe('BookingsContent', () => {
  let component: BookingsContent;
  let fixture: ComponentFixture<BookingsContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingsContent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingsContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
