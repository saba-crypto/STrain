import { Component, ChangeDetectionStrategy, input, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Station } from '../../../../train/models/station.model';
import { DefaultButton } from '../../../../../shared/ui/buttons/default-button/default-button';

@Component({
  selector: 'app-hero-section',
  imports: [DefaultButton],
  templateUrl: './hero-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './hero-section.scss',
})
export class HeroSection {
  private readonly router = inject(Router);

  public stations = input<Station[]>([]);
  public origin = signal<string>('');
  public destination = signal<string>('');

  public onOriginChange(val: string): void {
    this.origin.set(val);
  }

  public onDestinationChange(val: string): void {
    this.destination.set(val);
  }

  public onSearch(): void {
    const originVal = this.origin().trim();
    const destinationVal = this.destination().trim();

    const queryParams: Record<string, string> = {};
    if (originVal) {
      queryParams['origin'] = originVal;
    }
    if (destinationVal) {
      queryParams['destination'] = destinationVal;
    }

    this.router.navigate(['/trains'], { queryParams });
  }
}
