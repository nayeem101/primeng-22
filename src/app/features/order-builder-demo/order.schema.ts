import {
  applyEach,
  applyWhen,
  disabled,
  max,
  maxLength,
  min,
  minLength,
  pattern,
  required,
  schema,
  validate,
} from '@angular/forms/signals';

import { Order } from './order.model';

export const orderSchema = schema<Order>((s) => {
  required(s.customerName, { message: 'Customer name is required' });
  minLength(s.customerName, 2, { message: 'At least 2 characters' });

  required(s.orderType, { message: 'Pick an order type' });

  minLength(s.items, 1, { message: 'Add at least one line item' });
  applyEach(s.items, (item) => {
    required(item.product, { message: 'Select a product' });
    min(item.quantity, 1, { message: 'Quantity must be at least 1' });
    max(item.quantity, 99, { message: 'Quantity must be 99 or fewer' });
    min(item.unitPrice, 0.5, { message: 'Unit price must be at least 0.50' });
  });

  // The gift group only becomes active when the order type is "gift".
  disabled(s.gift, {
    when: ({ valueOf }) => valueOf(s.orderType) !== 'gift',
  });
  applyWhen(
    s.gift,
    ({ valueOf }) => valueOf(s.orderType) === 'gift',
    (gift) => {
      required(gift.wrapStyle, { message: 'Choose a wrap style' });
      maxLength(gift.message, 200, { message: 'Message must be 200 characters or fewer' });
      validate(gift.message, ({ value }) => {
        const raw = value();
        if (raw && raw.trim().length < 5) {
          return { kind: 'tooShort', message: 'Write at least 5 characters' };
        }
        return undefined;
      });
    },
  );

  // The subscription group only becomes active when the order type is "subscription".
  disabled(s.subscription, {
    when: ({ valueOf }) => valueOf(s.orderType) !== 'subscription',
  });
  applyWhen(
    s.subscription,
    ({ valueOf }) => valueOf(s.orderType) === 'subscription',
    (subscription) => {
      required(subscription.frequency, { message: 'Choose a delivery frequency' });
      required(subscription.startDate, { message: 'Start date is required' });
      validate(subscription.startDate, ({ value }) => {
        const raw = value();
        if (!raw) {
          return undefined;
        }
        const date = new Date(raw);
        if (Number.isNaN(date.getTime())) {
          return { kind: 'invalidDate', message: 'Enter a valid date' };
        }
        return undefined;
      });
    },
  );

  // The promo code field only becomes active when the discount toggle is on.
  disabled(s.promo.code, {
    when: ({ valueOf }) => !valueOf(s.promo.applyDiscount),
  });
  applyWhen(
    s.promo.code,
    ({ valueOf }) => valueOf(s.promo.applyDiscount),
    (code) => {
      required(code, { message: 'Enter a promo code' });
      pattern(code, /^[A-Z]{3}-\d{3}$/, { message: 'Use the format ABC-123' });
    },
  );
});
