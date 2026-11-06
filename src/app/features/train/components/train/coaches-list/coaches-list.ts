import { Component, input } from '@angular/core';
import { Coach } from '../../../models/train.model';

@Component({
  imports: [],
  selector: 'app-coaches-list',
  styleUrl: './coaches-list.scss',
  templateUrl: './coaches-list.html',
})
export class CoachesList {
  public coaches = input<Coach[]>();
}
