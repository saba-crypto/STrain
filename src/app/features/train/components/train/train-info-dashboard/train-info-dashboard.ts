import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Train } from '../../../models/train.model';

export type TrainDetailTab = 'schedules' | 'coaches';

@Component({
  selector: 'app-train-info-dashboard',
  imports: [RouterLink],
  templateUrl: './train-info-dashboard.html',
  styleUrl: './train-info-dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainInfoDashboard {
  public train = input.required<Train>();
  public activeTab = input<TrainDetailTab>('schedules');
  public tabChange = output<TrainDetailTab>();

  public selectTab(tab: TrainDetailTab): void {
    this.tabChange.emit(tab);
  }
}
