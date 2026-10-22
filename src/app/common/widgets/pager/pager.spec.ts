import { TestBed } from '@angular/core/testing';
import { Pager } from './pager';

describe('Pager', () => {
  it('disables "Anterior" on the first page and requests the next one', async () => {
    const fixture = TestBed.createComponent(Pager);
    fixture.componentRef.setInput('page', 1);
    fixture.componentRef.setInput('pageCount', 5);
    await fixture.whenStable();

    let requested = 0;
    fixture.componentInstance.changed.subscribe((p) => (requested = p));
    const [previous, next] = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('button'),
    );

    expect(previous.disabled).toBe(true);
    next.click();
    expect(requested).toBe(2);
  });

  it('renders nothing when there is a single page', async () => {
    const fixture = TestBed.createComponent(Pager);
    fixture.componentRef.setInput('page', 1);
    fixture.componentRef.setInput('pageCount', 1);
    await fixture.whenStable();

    expect((fixture.nativeElement as HTMLElement).querySelector('nav')).toBeNull();
  });
});
