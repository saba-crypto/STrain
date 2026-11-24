import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { HeroSection } from '../../components/sections/hero-section/hero-section';
import { FeaturesSection } from '../../components/sections/features-section/features-section';
import { CtaSection } from '../../components/sections/cta-section/cta-section';
import { StationService } from '../../../train/services/station.service';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [HeroSection, FeaturesSection, CtaSection, AsyncPipe],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly stationService = inject(StationService);

  public stations$ = this.stationService.getStations().pipe(
    map((res) => res.data),
  );
}
