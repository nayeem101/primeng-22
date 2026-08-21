import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';

import { createEmptyOrder, Order } from './order.model';
import { OrderBuilderPage } from './order-builder.page';

function validOrder(): Order {
  return {
    ...createEmptyOrder(),
    customerName: 'Ada Lovelace',
    orderType: 'gift',
    items: [{ product: 'coffee-1kg', quantity: 2, unitPrice: 18.5 }],
    gift: {
      message: 'Happy brewing!',
      wrapStyle: 'classic',
    },
    subscription: {
      frequency: '',
      startDate: '',
    },
    promo: {
      applyDiscount: false,
      code: '',
    },
  };
}

describe('OrderBuilderPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderBuilderPage],
      providers: [provideRouter([]), MessageService],
    }).compileComponents();
  });

  it('should create the page', async () => {
    const fixture = TestBed.createComponent(OrderBuilderPage);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-testid="order-builder-demo"]')).toBeTruthy();
  });

  it('should keep submit from saving when the form is invalid', async () => {
    const fixture = TestBed.createComponent(OrderBuilderPage);
    const page = fixture.componentInstance;
    await fixture.whenStable();

    const formEl = fixture.nativeElement.querySelector(
      '[data-testid="order-form"]',
    ) as HTMLFormElement;
    formEl.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();

    expect(page['submittedPayload']()).toBe('');
    expect(page['orderForm']().valid()).toBe(false);
  });

  it('should add and remove line items via the model', async () => {
    const fixture = TestBed.createComponent(OrderBuilderPage);
    const page = fixture.componentInstance;
    await fixture.whenStable();

    const addButton = fixture.nativeElement.querySelector(
      '[data-testid="add-item"]',
    ) as HTMLButtonElement;
    addButton.click();
    await fixture.whenStable();
    expect(page['model']().items.length).toBe(1);
    expect(fixture.nativeElement.querySelector('[data-testid="item-0"]')).toBeTruthy();

    const removeButton = fixture.nativeElement.querySelector(
      '[data-testid="remove-item-0"]',
    ) as HTMLButtonElement;
    removeButton.click();
    await fixture.whenStable();
    expect(page['model']().items.length).toBe(0);
  });

  it('should activate the gift section only for gift orders', async () => {
    const fixture = TestBed.createComponent(OrderBuilderPage);
    const page = fixture.componentInstance;
    await fixture.whenStable();

    expect(page['orderForm'].gift().disabled()).toBe(true);

    page['model'].set({ ...createEmptyOrder(), orderType: 'gift' });
    await fixture.whenStable();

    expect(page['orderForm'].gift().disabled()).toBe(false);
    expect(page['orderForm'].subscription().disabled()).toBe(true);
  });

  it('should submit a valid order and expose the payload', async () => {
    const fixture = TestBed.createComponent(OrderBuilderPage);
    const page = fixture.componentInstance;
    page['model'].set(validOrder());
    await fixture.whenStable();

    expect(page['orderForm']().valid()).toBe(true);

    const formEl = fixture.nativeElement.querySelector(
      '[data-testid="order-form"]',
    ) as HTMLFormElement;
    formEl.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();

    expect(page['submittedPayload']()).toContain('coffee-1kg');
    expect(
      fixture.nativeElement.querySelector('[data-testid="submitted-payload"]')?.textContent,
    ).toContain('Ada Lovelace');
  });
});
