import { Component } from '@angular/core';
import { DefaultButton } from '../../../../../shared/buttons/default-button/default-button';
import { OutlineButton } from '../../../../../shared/buttons/outline-button/outline-button';

@Component({
  selector: 'app-section-3',
  imports: [DefaultButton, OutlineButton],
  templateUrl: './section-3.html',
  styleUrl: './section-3.scss',
})
export class Section3 {}
