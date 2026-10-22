import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideCircleCheck } from '@lucide/angular';

@Component({
  selector: 'app-suggest-character',
  imports: [ReactiveFormsModule, LucideCircleCheck],
  templateUrl: './suggest-character.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestCharacter {
  private readonly fb = inject(FormBuilder).nonNullable;

  /** Name of the last suggestion sent, shown in the thank-you banner. */
  protected readonly sentName = signal<string | null>(null);
  protected readonly raceOptions = ['Saiyan', 'Human', 'Namekian', 'Android', 'Majin', 'Otra'];

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    race: ['Saiyan', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    reason: ['', [Validators.maxLength(200)]],
  });

  protected submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.sentName.set(this.form.getRawValue().name);
    this.form.reset();
  }

  protected hasError(field: keyof typeof this.form.controls, error: string) {
    const control = this.form.controls[field];
    return control.touched && control.hasError(error);
  }
}
