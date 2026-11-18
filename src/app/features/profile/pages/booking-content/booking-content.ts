import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-booking-content',
  styleUrl: './booking-content.scss',
  templateUrl: './booking-content.html',
})
export class BookingContent {
  //gets id from query params
  id = input.required<number, string | number>({
    transform: (value) => {
      return Number(value);
    },
  });
}
