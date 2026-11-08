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
  public stations = input<Station[]>([]);
  public searchState = input<string>();
  public search = output<string>();
  public origin = output<string>();
  public destination = output<string>();
  public filterClear = output<void>();

  public onSearch(query: string): void {
    this.search.emit(query.trim());
  }

  public onOriginChange(query: string): void {
    this.origin.emit(query);
  }

  public onDestinationChange(query: string) {
    this.destination.emit(query);
  }

  public onFilterClear(
    originSelect?: HTMLSelectElement,
    destinationSelect?: HTMLSelectElement,
  ): void {
    if (originSelect) originSelect.value = '';
    if (destinationSelect) destinationSelect.value = '';
    this.filterClear.emit();
  }
}
