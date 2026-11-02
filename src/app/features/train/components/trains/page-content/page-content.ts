import { Component, input, signal } from '@angular/core';
import { FiltersSidebar } from '../filters-sidebar/filters-sidebar';
import { TrainCardGrid } from '../train-card-grid/train-card-grid';
import { Train } from '../../../models/train.model';

@Component({
  selector: 'app-page-content',
  imports: [FiltersSidebar, TrainCardGrid],
  templateUrl: './page-content.html',
  styleUrl: './page-content.scss',
})
export class PageContent {
  public trains = input<Train[]>([]);
}
