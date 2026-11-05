import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Station } from '../../../models/station.model';

@Component({
  selector: 'app-filters-sidebar',
  imports: [],
  templateUrl: './filters-sidebar.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './filters-sidebar.scss',
})
export class FiltersSidebar {
  public search = output<string>();
  public origin = output<string>();
  public destination = output<string>();
  public stations = input<Station[]>([]);

  public onSearch(query: string): void {
    this.search.emit(query.trim());
  }

  public onOriginChange(query: string): void {
    this.origin.emit(query);
  }

  public onDestinationChange(query: string) {
    this.destination.emit(query);
  }
}
