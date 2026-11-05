import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DefaultButton } from '../../../../../shared/buttons/default-button/default-button';

@Component({
  selector: 'app-hero-section',
  imports: [DefaultButton],
  templateUrl: './hero-section.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './hero-section.scss',
})
export class HeroSection {}
