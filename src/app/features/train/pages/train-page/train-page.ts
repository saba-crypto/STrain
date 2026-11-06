import { Component, input, inject } from '@angular/core';
import { TrainService } from '../../services/train.service';
import { map } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  imports: [],
  selector: 'app-train-page',
  styleUrl: './train-page.scss',
  templateUrl: './train-page.html',
})
export class TrainPage {
  private readonly trainService = inject(TrainService);

  public id = input.required<number, string | number>({
    transform: (val) => Number(val),
  });

  public trainResource = rxResource({
    params: () => this.id(),
    stream: ({ params: id }) => this.trainService.getTrainById(id).pipe(map((res) => res.data)),
  });
}
