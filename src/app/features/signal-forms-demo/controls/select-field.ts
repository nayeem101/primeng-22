import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormValueControl } from '@angular/forms/signals';
import { Select } from 'primeng/select';

/** FormValueControl wrapper — PrimeNG Select's internal value typing breaks [formField]. */
@Component({
  selector: 'app-select-field',
  imports: [Select, FormsModule],
  template: `
    <p-select
      [options]="options()"
      [optionLabel]="optionLabel()"
      [optionValue]="optionValue()"
      [placeholder]="placeholder()"
      fluid
      [ngModel]="value()"
      (ngModelChange)="value.set($event ?? '')"
      [disabled]="disabled()"
      [invalid]="showInvalid()"
    />
  `,
})
export class SelectField implements FormValueControl<string> {
  readonly value = model('');
  readonly disabled = input(false);
  readonly showInvalid = input(false);
  readonly options = input.required<Array<{ label: string; value: string }>>();
  readonly optionLabel = input('label');
  readonly optionValue = input('value');
  readonly placeholder = input('');
}
