import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-booking-page',
  styleUrl: './booking-page.scss',
  templateUrl: './booking-page.html',
})
export class BookingPage {
  public trainId = input();
  public scheduleId = input();

  ngOnInit() {
    console.log(this.trainId(), this.scheduleId());
  }
}
