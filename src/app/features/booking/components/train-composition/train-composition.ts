import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  input,
  output,
  viewChild,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Coach } from '../../models/coach.model';

@Component({
  selector: 'app-train-composition',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './train-composition.html',
  styleUrl: './train-composition.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainComposition implements OnDestroy {
  public coaches = input<Coach[]>([]);
  public selectedCoach = input<Coach | null>(null);
  public coachSelect = output<Coach>();

  public readonly carousel = viewChild<ElementRef<HTMLDivElement>>('carousel');
  public readonly carouselTrack = viewChild<ElementRef<HTMLDivElement>>('carouselTrack');

  private carouselOffset = 0;
  private carouselTargetOffset = 0;
  private carouselAnimId: number | null = null;
  private isDragging = false;
  private dragStartX = 0;
  private dragStartOffset = 0;
  private hasDragged = false;

  private readonly onWindowMouseMove = (e: MouseEvent): void => {
    const trackEl = this.carouselTrack()?.nativeElement;
    const containerEl = this.carousel()?.nativeElement;
    if (!this.isDragging || !trackEl || !containerEl) {
      return;
    }

    const diff = this.dragStartX - e.clientX;
    if (!this.hasDragged && Math.abs(diff) > 5) {
      this.hasDragged = true;
    }

    const maxScroll = Math.max(0, trackEl.scrollWidth - containerEl.clientWidth);
    this.carouselTargetOffset = Math.max(0, Math.min(maxScroll, this.dragStartOffset + diff));

    if (this.carouselAnimId === null) {
      this.runCarousel();
    }
  };

  private readonly onWindowMouseUp = (): void => {
    this.isDragging = false;
    const containerEl = this.carousel()?.nativeElement;
    if (containerEl) {
      containerEl.style.cursor = '';
    }

    if (this.hasDragged) {
      window.addEventListener('click', this.preventClickAfterDrag, true);
    }

    window.removeEventListener('mousemove', this.onWindowMouseMove);
    window.removeEventListener('mouseup', this.onWindowMouseUp);
  };

  private readonly preventClickAfterDrag = (e: MouseEvent): void => {
    e.stopPropagation();
    e.preventDefault();
    window.removeEventListener('click', this.preventClickAfterDrag, true);
  };

  public onCarouselMouseDown(event: MouseEvent): void {
    if (event.button !== 0) {
      return;
    }

    const containerEl = this.carousel()?.nativeElement;
    if (!containerEl) {
      return;
    }

    this.isDragging = true;
    this.hasDragged = false;
    this.dragStartX = event.clientX;
    this.dragStartOffset = this.carouselOffset;
    containerEl.style.cursor = 'grabbing';

    window.addEventListener('mousemove', this.onWindowMouseMove);
    window.addEventListener('mouseup', this.onWindowMouseUp);
  }

  public onCarouselWheel(event: WheelEvent): void {
    const trackEl = this.carouselTrack()?.nativeElement;
    const containerEl = this.carousel()?.nativeElement;
    if (!trackEl || !containerEl) {
      return;
    }

    const maxScroll = Math.max(0, trackEl.scrollWidth - containerEl.clientWidth);
    if (maxScroll <= 0) {
      return;
    }

    event.preventDefault();
    const delta = event.deltaX !== 0 ? event.deltaX : event.deltaY;
    this.carouselTargetOffset = Math.max(0, Math.min(maxScroll, this.carouselTargetOffset + delta));

    if (this.carouselAnimId === null) {
      this.runCarousel();
    }
  }

  private runCarousel(): void {
    const trackEl = this.carouselTrack()?.nativeElement;
    if (!trackEl) {
      return;
    }

    const diff = this.carouselTargetOffset - this.carouselOffset;
    if (Math.abs(diff) < 0.4) {
      this.carouselOffset = this.carouselTargetOffset;
      trackEl.style.transform = `translateX(-${this.carouselOffset}px)`;
      this.carouselAnimId = null;
      return;
    }

    this.carouselOffset += diff * 0.1;
    trackEl.style.transform = `translateX(-${this.carouselOffset}px)`;
    this.carouselAnimId = requestAnimationFrame(() => this.runCarousel());
  }

  public onCoachClick(coach: Coach): void {
    this.coachSelect.emit(coach);
  }

  public getCoachClassBadge(coachClass: number | string): string {
    const c = String(coachClass).toLowerCase();
    if (c === '2' || c.includes('second')) {
      return 'badge-second';
    }
    if (c.includes('business')) {
      return 'badge-business';
    }
    return 'badge-three';
  }

  public ngOnDestroy(): void {
    if (this.carouselAnimId !== null) {
      cancelAnimationFrame(this.carouselAnimId);
      this.carouselAnimId = null;
    }
    window.removeEventListener('mousemove', this.onWindowMouseMove);
    window.removeEventListener('mouseup', this.onWindowMouseUp);
    window.removeEventListener('click', this.preventClickAfterDrag, true);
  }
}
