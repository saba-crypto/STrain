import { Component, signal, inject } from '@angular/core';
import { PageHeading } from '../../components/trains/page-heading/page-heading';
import { PageContent } from '../../components/trains/page-content/page-content';
import { TrainService } from '../../services/train.service';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-trains-page',
  imports: [PageHeading, PageContent, AsyncPipe],
  templateUrl: './trains-page.html',
  styleUrl: './trains-page.scss',
})
export class TrainsPage {
  private readonly trainServices = inject(TrainService);
  public currentPage = signal<number>(1);
  public trainsPerPage = signal<number>(10);

  public trains$ = this.trainServices
    .getTrains(this.trainsPerPage(), this.currentPage())
    .pipe(map((res) => res.data.items));
}
