import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Train } from '../../../models/train.model';

@Component({
  selector: 'app-train-card',
  imports: [],
  templateUrl: './train-card.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './train-card.scss',
})
export class TrainCard {
  public train = input.required<Train>();
}
