import { Component } from '@angular/core';
import { TrainCard } from '../train-card/train-card';

@Component({
  selector: 'app-train-card-grid',
  imports: [TrainCard],
  templateUrl: './train-card-grid.html',
  styleUrl: './train-card-grid.scss',
})
export class TrainCardGrid {}
