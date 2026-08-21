import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { form, FormField, submit } from '@angular/forms/signals';
import { ArrowLeft } from '@primeicons/angular/arrow-left';
import { Check } from '@primeicons/angular/check';
import { FileCheck } from '@primeicons/angular/file-check';
import { FileEdit } from '@primeicons/angular/file-edit';
import { Gift } from '@primeicons/angular/gift';
import { ListCheck } from '@primeicons/angular/list-check';
import { Plus } from '@primeicons/angular/plus';
import { Refresh } from '@primeicons/angular/refresh';
import { ShoppingCart } from '@primeicons/angular/shopping-cart';
import { Spinner } from '@primeicons/angular/spinner';
import { Tag } from '@primeicons/angular/tag';
import { Trash } from '@primeicons/angular/trash';
import { MessageService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { SelectButton } from 'primeng/selectbutton';
import { Textarea } from 'primeng/textarea';
import { Toast } from 'primeng/toast';
import { ToggleSwitch } from 'primeng/toggleswitch';

import {
  createEmptyLineItem,
  createEmptyOrder,
  FREQUENCY_OPTIONS,
  LineItem,
  ORDER_TYPE_OPTIONS,
  PRODUCT_OPTIONS,
  WRAP_STYLE_OPTIONS,
} from './order.model';
import { orderSchema } from './order.schema';
import { IsoDateField } from '../signal-forms-demo/controls/iso-date-field';
import { SelectField } from '../signal-forms-demo/controls/select-field';
import { FieldErrors } from '../signal-forms-demo/field-errors';

@Component({
  selector: 'app-order-builder-page',
  imports: [
    DecimalPipe,
    RouterLink,
    FormField,
    ButtonDirective,
    Card,
    FloatLabel,
    InputNumber,
    InputText,
    Message,
    SelectButton,
    Textarea,
    Toast,
    ToggleSwitch,
    IsoDateField,
    SelectField,
    FieldErrors,
    ArrowLeft,
    Check,
    FileCheck,
    FileEdit,
    Gift,
    ListCheck,
    Plus,
    Refresh,
    ShoppingCart,
    Spinner,
    Tag,
    Trash,
  ],
  providers: [MessageService],
  templateUrl: './order-builder.page.html',
})
export class OrderBuilderPage {
  private readonly messages = inject(MessageService);

  protected readonly orderTypeOptions = ORDER_TYPE_OPTIONS;
  protected readonly productOptions = PRODUCT_OPTIONS;
  protected readonly wrapStyleOptions = WRAP_STYLE_OPTIONS;
  protected readonly frequencyOptions = FREQUENCY_OPTIONS;

  protected readonly submittedPayload = signal('');

  protected readonly model = signal(createEmptyOrder());
  protected readonly orderForm = form(this.model, orderSchema);

  protected readonly orderTotal = computed(() =>
    roundCents(this.model().items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)),
  );

  protected subtotal(item: LineItem): number {
    return roundCents(item.quantity * item.unitPrice);
  }

  protected addItem(): void {
    this.model.update((current) => ({
      ...current,
      items: [...current.items, createEmptyLineItem()],
    }));
  }

  protected removeItem(index: number): void {
    this.model.update((current) => ({
      ...current,
      items: current.items.filter((_, i) => i !== index),
    }));
  }

  protected async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    await submit(this.orderForm, async () => {
      this.submittedPayload.set(JSON.stringify(this.model(), null, 2));
      this.messages.add({
        severity: 'success',
        summary: 'Order placed',
        detail: 'Signal Forms submit() ran with a valid model.',
        life: 3500,
      });
    });
  }
}

function roundCents(value: number): number {
  return Math.round(value * 100) / 100;
}
