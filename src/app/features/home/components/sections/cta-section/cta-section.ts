import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DefaultButton } from '../../../../../shared/ui/buttons/default-button/default-button';

import { RouterLink } from '@angular/router';
import { OutlineButton } from '../../../../../shared/ui/buttons/outline-button/outline-button';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-cta-section',
  imports: [DefaultButton, OutlineButton, RouterLink],
  templateUrl: './cta-section.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './cta-section.scss',
})
export class CtaSection {
  private readonly authService = inject(AuthService);
  public isAuthenticated = this.authService.isAuthenticated;
}
