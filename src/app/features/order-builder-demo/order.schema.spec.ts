import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form } from '@angular/forms/signals';

import { createEmptyOrder, Order } from './order.model';
import { orderSchema } from './order.schema';

function createTestForm(overrides: Partial<Order> = {}) {
  return TestBed.runInInjectionContext(() => {
    const model = signal({
      ...createEmptyOrder(),
      ...overrides,
      gift: {
        ...createEmptyOrder().gift,
        ...overrides.gift,
      },
      subscription: {
        ...createEmptyOrder().subscription,
        ...overrides.subscription,
      },
      promo: {
        ...createEmptyOrder().promo,
        ...overrides.promo,
      },
      items: overrides.items ?? [],
    });

    return { model, orderForm: form(model, orderSchema) };
  });
}

describe('orderSchema', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should mark an empty order invalid', () => {
    const { orderForm } = createTestForm();
    expect(orderForm().valid()).toBe(false);
    expect(orderForm.customerName().invalid()).toBe(true);
    expect(orderForm.orderType().invalid()).toBe(true);
    expect(orderForm.items().invalid()).toBe(true);
  });

  it('should validate each line item through applyEach', () => {
    const { orderForm } = createTestForm({
      items: [
        { product: '', quantity: 0, unitPrice: 0 },
        { product: 'coffee-1kg', quantity: 2, unitPrice: 20 },
      ],
    });

    expect(orderForm.items[0].product().invalid()).toBe(true);
    expect(orderForm.items[0].quantity().errors().some((e) => e.kind === 'min')).toBe(true);
    expect(orderForm.items[1]().valid()).toBe(true);
  });

  it('should keep the gift group disabled and unvalidated for non-gift orders', () => {
    const { orderForm } = createTestForm({ orderType: 'standard' });

    expect(orderForm.gift().disabled()).toBe(true);
    expect(orderForm.gift.wrapStyle().errors().some((e) => e.kind === 'required')).toBe(false);
  });

  it('should activate the gift group when the order type is gift', () => {
    const { orderForm } = createTestForm({
      orderType: 'gift',
      gift: { message: '', wrapStyle: '' },
    });

    expect(orderForm.gift().disabled()).toBe(false);
    expect(orderForm.gift.wrapStyle().invalid()).toBe(true);
    expect(orderForm.gift.wrapStyle().errors().some((e) => e.kind === 'required')).toBe(true);
  });

  it('should activate the subscription group when the order type is subscription', () => {
    const { orderForm } = createTestForm({
      orderType: 'subscription',
      subscription: { frequency: '', startDate: '' },
    });

    expect(orderForm.subscription().disabled()).toBe(false);
    expect(orderForm.subscription.frequency().errors().some((e) => e.kind === 'required')).toBe(
      true,
    );
    expect(orderForm.subscription.startDate().errors().some((e) => e.kind === 'required')).toBe(
      true,
    );
  });

  it('should disable the promo code until applyDiscount is on', () => {
    const off = createTestForm({ promo: { applyDiscount: false, code: '' } }).orderForm;
    expect(off.promo.code().disabled()).toBe(true);

    const on = createTestForm({ promo: { applyDiscount: true, code: '' } }).orderForm;
    expect(on.promo.code().disabled()).toBe(false);
    expect(on.promo.code().errors().some((e) => e.kind === 'required')).toBe(true);
  });

  it('should enforce the promo code format when active', () => {
    const bad = createTestForm({ promo: { applyDiscount: true, code: 'save100' } }).orderForm;
    expect(bad.promo.code().errors().some((e) => e.kind === 'pattern')).toBe(true);

    const good = createTestForm({ promo: { applyDiscount: true, code: 'TEA-100' } }).orderForm;
    expect(good.promo.code().valid()).toBe(true);
  });
});
