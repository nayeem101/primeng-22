import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormValueControl } from '@angular/forms/signals';
import { Password } from 'primeng/password';

/** FormValueControl wrapper — PrimeNG Password's internal value typing breaks [formField]. */
@Component({
  selector: 'app-password-field',
  imports: [Password, FormsModule],
  template: `
    <p-password
      [inputId]="inputId()"
      fluid
      [feedback]="feedback()"
      [toggleMask]="true"
      [ngModel]="value()"
      (ngModelChange)="value.set($event ?? '')"
      [disabled]="disabled()"
      [invalid]="showInvalid()"
      styleClass="w-full"
    />
  `,
})
export class PasswordField implements FormValueControl<string> {
  readonly value = model('');
  readonly disabled = input(false);
  readonly showInvalid = input(false);
  readonly feedback = input(true);
  readonly inputId = input('');
}
