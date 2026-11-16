import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-booking-empty-state',
  styleUrl: './booking-empty-state.scss',
  templateUrl: './booking-empty-state.html',
})
export class BookingEmptyState {}
