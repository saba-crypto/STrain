import { Component, signal, inject, computed, Injector } from '@angular/core';
import { PageHeading } from '../../components/trains/page-heading/page-heading';
import { PageContent } from '../../components/trains/page-content/page-content';
import { TrainService } from '../../services/train.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { map, switchMap } from 'rxjs';
import { StationService } from '../../services/station.service';

@Component({
  selector: 'app-trains-page',
  imports: [PageHeading, PageContent, AsyncPipe],
  templateUrl: './trains-page.html',
  styleUrl: './trains-page.scss',
})
export class TrainsPage {
  private readonly trainServices = inject(TrainService);
  private readonly stationServices = inject(StationService);
  public injector = inject(Injector); //injecting an injector :/

  //filterStates
  public currentPage = signal<number>(1);
  public trainsPerPage = signal<number>(10);
  public origin = signal<string>('');
  public destination = signal<string>('');
  public searchState = signal<string>('');

  //filterStates bundle
  public trainsState = computed(() => ({
    currentPage: this.currentPage(),
    trainsPerPage: this.trainsPerPage(),
    origin: this.origin(),
    destination: this.destination(),
    searchState: this.searchState(),
  }));

  public filterState = computed(() => ({
    origin: this.origin(),
    destination: this.destination(),
  }));

  // public stations$ = this.stationServices.getStations().pipe(
  //   map((res) => {
  //     return res.data;
  //   }),
  // );
  public stations$ = toObservable(this.filterState, { injector: this.injector }).pipe(
    switchMap((state) => {}),
  );

  public trains$ = toObservable(this.trainsState, { injector: this.injector }).pipe(
    switchMap((state) => {
      if (state.searchState.length > 0) {
        return this.trainServices.getTrainsBySearch(
          state.searchState,
          state.trainsPerPage,
          state.currentPage,
        );
      } else if (state.origin || state.destination) {
        return this.trainServices.getTrainsByFilter(
          state.origin,
          state.destination,
          state.trainsPerPage,
          state.currentPage,
        );
      } else {
        return this.trainServices.getTrains(state.trainsPerPage, state.currentPage);
      }
    }),
    map((res) => res.data.items),
  );

  //methods

  //trains
  searchTrains(query: string) {
    this.currentPage.set(1);
    this.searchState.set(query);
  }

  changeOrigin(origin: string) {
    this.origin.set(origin);
  }

  changeDestination(destination: string) {
    this.destination.set(destination);
    console.log(this.destination());
  }

  changeCurrentPage(page: number) {
    if (page > 0) {
      this.currentPage.set(page);
    }
  }

  changeTrainsPerPage(take: number) {
    if (take > 0) {
      this.trainsPerPage.set(take);
    }
  }

  clearFilters() {
    this.origin.set('');
    this.destination.set('');
    this.searchState.set('');
  }
}

// if (state.searchState.length > 0) {
//   return this.trainServices.getTrainsBySearch(
//     state.searchState,
//     state.trainsPerPage,
//     state.currentPage,
//   );
// } else if (state.filterState.origin.length > 0) {
//   return this.trainServices.getTrainsByFilter(
//     state.filterState.origin,
//     state.filterState.destination,
//     state.trainsPerPage,
//     state.currentPage,
//   );
// } else {
//   return this.trainServices.getTrains(state.trainsPerPage, state.currentPage);
// }

// public trains$ = this.trainServices
//   .getTrains(this.trainsPerPage(), this.currentPage())
//   .pipe(map((res) => res.data.items));
