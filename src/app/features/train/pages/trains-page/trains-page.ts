import { Component, signal, inject, computed, OnInit, DestroyRef } from '@angular/core';
import { PageHeading } from '../../components/trains/page-heading/page-heading';
import { PageContent } from '../../components/trains/page-content/page-content';
import { TrainService } from '../../services/train.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { StationService } from '../../services/station.service';
import { TrainsResponse } from '../../models/train.model';

@Component({
  selector: 'app-trains-page',
  imports: [PageHeading, PageContent, AsyncPipe],
  templateUrl: './trains-page.html',
  styleUrl: './trains-page.scss',
})
export class TrainsPage implements OnInit {
  private readonly trainServices = inject(TrainService);
  private readonly stationServices = inject(StationService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private searchTimeout?: ReturnType<typeof setTimeout>;

  constructor() {
    this.destroyRef.onDestroy(() => clearTimeout(this.searchTimeout));
  }

  //filterStates
  public origin = signal<string>('');
  public destination = signal<string>('');
  public searchState = signal<string>('');

  //filterStates bundle
  public trainsState = computed(() => ({
    origin: this.origin(),
    destination: this.destination(),
    searchState: this.searchState(),
  }));

  public stations$ = this.stationServices.getStations().pipe(
    map((res) => {
      return res.data;
    }),
  );

  //filtration logic
  public trainsResource = rxResource({
    defaultValue: [],
    params: () => this.trainsState(),
    stream: (request) => {
      let trainsResponse: Observable<TrainsResponse>;
      const { origin, destination, searchState } = request.params;
      if (origin || destination) {
        trainsResponse = this.trainServices.getTrainsByFilter(origin, destination);
      } else if (searchState) {
        trainsResponse = this.trainServices.getTrainsBySearch(searchState.trim());
      } else {
        trainsResponse = this.trainServices.getTrains();
      }
      return trainsResponse.pipe(
        map((res) => {
          return res.data.items;
        }),
      );
    },
  });

  //query params
  ngOnInit(): void {
    const queryOrigin = this.route.snapshot.queryParamMap.get('origin');
    const queryDestination = this.route.snapshot.queryParamMap.get('destination');
    if (queryOrigin) {
      this.origin.set(queryOrigin);
    }
    if (queryDestination) {
      this.destination.set(queryDestination);
    }
  }

  //methods

  searchTrains(query: string) {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.searchState.set(query);
    }, 300);
  }

  changeOrigin(origin: string) {
    this.origin.set(origin);
  }

  changeDestination(destination: string) {
    this.destination.set(destination);
    console.log(this.destination());
  }

  clearFilters() {
    this.origin.set('');
    this.destination.set('');
    this.searchState.set('');
  }
}
