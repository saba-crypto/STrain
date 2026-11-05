import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroSection } from '../../components/sections/hero-section/hero-section';
import { FeaturesSection } from '../../components/sections/features-section/features-section';
import { CtaSection } from '../../components/sections/cta-section/cta-section';

@Component({
  selector: 'app-home-page',
  imports: [HeroSection, FeaturesSection, CtaSection],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home-page.scss',
})
export class HomePage {}
