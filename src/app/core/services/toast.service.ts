import { Injectable, signal } from '@angular/core';

type ToastType = 'success' | 'error';

interface Toast {
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toast = signal<Toast | null>(null);
  private timeoutId?: ReturnType<typeof setTimeout>;

  show(message: string, type: ToastType = 'success') {
    clearTimeout(this.timeoutId);
    this.toast.set({ message, type });
    this.timeoutId = setTimeout(() => {
      this.hide();
    }, 3000);
  }

  hide() {
    this.toast.set(null);
  }
}
