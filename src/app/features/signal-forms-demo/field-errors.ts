import { Component, input } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'app-field-errors',
  template: `
    @if (show() && errors().length) {
      <ul class="field-errors" role="alert" [attr.data-testid]="testId()">
        @for (error of errors(); track error.kind + (error.message ?? '')) {
          <li>{{ error.message || error.kind }}</li>
        }
      </ul>
    }
  `,
  styles: `
    .field-errors {
      margin: 0.35rem 0 0;
      padding: 0;
      list-style: none;
      color: var(--p-red-500, #ef4444);
      font-size: 0.8rem;
      line-height: 1.35;
    }
  `,
})
export class FieldErrors {
  readonly errors = input.required<readonly ValidationError.WithOptionalFieldTree[]>();
  readonly show = input(true);
  readonly testId = input('field-errors');
}
