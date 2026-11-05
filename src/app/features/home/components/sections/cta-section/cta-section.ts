import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DefaultButton } from '../../../../../shared/buttons/default-button/default-button';
import { OutlineButton } from '../../../../../shared/buttons/outline-button/outline-button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta-section',
  imports: [DefaultButton, OutlineButton, RouterLink],
  templateUrl: './cta-section.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './cta-section.scss',
})
export class CtaSection {}
