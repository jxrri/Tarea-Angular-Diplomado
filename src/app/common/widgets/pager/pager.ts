import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LucideChevronLeft, LucideChevronRight } from '@lucide/angular';

@Component({
  selector: 'app-pager',
  imports: [LucideChevronLeft, LucideChevronRight],
  templateUrl: './pager.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pager {
  readonly page = input.required<number>();
  readonly pageCount = input.required<number>();

  /** Emits the page number the user asked for. */
  readonly changed = output<number>();

  protected step(delta: number) {
    this.changed.emit(this.page() + delta);
  }
}
