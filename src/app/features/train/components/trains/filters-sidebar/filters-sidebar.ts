import { Component, input, output } from '@angular/core';
import { Station } from '../../../models/station.model';

@Component({
  selector: 'app-filters-sidebar',
  imports: [],
  templateUrl: './filters-sidebar.html',
  styleUrl: './filters-sidebar.scss',
})
export class FiltersSidebar {
  public search = output<string>();
  public stations = input<Station[]>([]);

  public onSearch(query: string): void {
    this.search.emit(query.trim());
  }
}
