import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Train } from '../../../models/train.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-train-card',
  imports: [RouterLink],
  templateUrl: './train-card.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './train-card.scss',
})
export class TrainCard {
  public train = input.required<Train>();
}
