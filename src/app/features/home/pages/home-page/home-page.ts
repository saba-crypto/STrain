import { Component } from '@angular/core';
import { HeroSection } from '../../components/sections/hero-section/hero-section';
import { FeaturesSection } from '../../components/sections/features-section/features-section';
import { CtaSection } from '../../components/sections/cta-section/cta-section';

@Component({
  selector: 'app-home-page',
  imports: [HeroSection, FeaturesSection, CtaSection],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
