import { Component, input, ChangeDetectionStrategy, ResourceRef } from '@angular/core';
import { TrainCard } from '../train-card/train-card';
import { Train } from '../../../models/train.model';

@Component({
  selector: 'app-train-card-grid',
  imports: [TrainCard],
  templateUrl: './train-card-grid.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './train-card-grid.scss',
})
export class TrainCardGrid {
  public trainsResource = input.required<ResourceRef<Train[]>>();
  public readonly skeletonItems = [1, 2, 3, 4, 5];
}
