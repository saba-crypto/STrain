import { Component, Input } from '@angular/core';

interface Feature {
  icon: 'classes' | 'dates' | 'seat' | 'confirmation';
  title: string;
  description: string;
}

@Component({
  selector: 'app-feature-card',
  imports: [],
  templateUrl: './feature-card.html',
  styleUrl: './feature-card.scss',
})
export class FeatureCard {
  @Input() feature!: Feature;
}
