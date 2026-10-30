import { Component } from '@angular/core';
import { FeatureCard } from '../../other/feature-card/feature-card';

@Component({
  selector: 'app-section-2',
  imports: [FeatureCard],
  templateUrl: './section-2.html',
  styleUrl: './section-2.scss',
})
export class Section2 {
  public features = [
    {
      icon: 'classes',
      title: 'Multiple Classes',
      description: 'Choose from First, Business, or Second class coaches on every train.',
    },
    {
      icon: 'dates',
      title: 'Flexible Dates',
      description: 'Pick any future travel date when booking — change it anytime before departure.',
    },
    {
      icon: 'seat',
      title: 'Choose Your Seat',
      description: 'Pick the exact seat you want from a live map of available seats.',
    },
    {
      icon: 'confirmation',
      title: 'Instant Confirmation',
      description: 'Your booking is confirmed immediately. View and manage all trips in your profile.',
    },
  ] as const;
}
