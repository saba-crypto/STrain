import { Component, input } from '@angular/core';
import { TrainCard } from '../train-card/train-card';
import { Train } from '../../../models/train.model';

@Component({
  selector: 'app-train-card-grid',
  imports: [TrainCard],
  templateUrl: './train-card-grid.html',
  styleUrl: './train-card-grid.scss',
})
export class TrainCardGrid {
  public trains = input<Train[]>([]);
}
