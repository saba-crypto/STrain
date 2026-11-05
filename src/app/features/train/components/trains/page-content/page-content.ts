import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { FiltersSidebar } from '../filters-sidebar/filters-sidebar';
import { TrainCardGrid } from '../train-card-grid/train-card-grid';
import { Train } from '../../../models/train.model';
import { Station } from '../../../models/station.model';

@Component({
  selector: 'app-page-content',
  imports: [FiltersSidebar, TrainCardGrid],
  templateUrl: './page-content.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './page-content.scss',
})
export class PageContent {
  public trains = input<Train[]>([]);
  public stations = input<Station[]>([]);
  public search = output<string>();
  public origin = output<string>();
  public destination = output<string>();
}
