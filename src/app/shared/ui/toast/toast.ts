import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  imports: [],
  selector: 'app-toast',
  styleUrl: './toast.scss',
  templateUrl: './toast.html',
})
export class Toast {
  private toastService = inject(ToastService);
  public toast = this.toastService.toast();

  hide() {
    this.toastService.hide();
  }
}
