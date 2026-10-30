import { Component } from '@angular/core';
import { DefaultButton } from '../../../../../shared/buttons/default-button/default-button';
import { OutlineButton } from '../../../../../shared/buttons/outline-button/outline-button';

@Component({
  selector: 'app-cta-section',
  imports: [DefaultButton, OutlineButton],
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.scss',
})
export class CtaSection {}
