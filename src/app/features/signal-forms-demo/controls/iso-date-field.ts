import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormValueControl } from '@angular/forms/signals';
import { DatePicker } from 'primeng/datepicker';

/**
 * Bridges PrimeNG DatePicker (which may emit null when cleared) to a string model
 * so Signal Forms never stores null/undefined.
 *
 * Uses `showInvalid` instead of FormValueControl's optional `invalid` input so
 * [formField] does not auto-paint invalid before the field is touched.
 */
@Component({
  selector: 'app-iso-date-field',
  imports: [DatePicker, FormsModule],
  template: `
    <p-datepicker
      fluid
      dataType="string"
      dateFormat="yy-mm-dd"
      [ngModel]="value()"
      (ngModelChange)="value.set($event ?? '')"
      [disabled]="disabled()"
      [invalid]="showInvalid()"
      [readonlyInput]="readonly()"
      [showIcon]="true"
    />
  `,
})
export class IsoDateField implements FormValueControl<string> {
  readonly value = model('');
  readonly disabled = input(false);
  readonly readonly = input(false);
  readonly showInvalid = input(false);
}
