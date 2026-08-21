export type OrderType = '' | 'standard' | 'gift' | 'subscription';

export type WrapStyle = '' | 'classic' | 'premium' | 'eco';

export type DeliveryFrequency = '' | 'weekly' | 'monthly' | 'quarterly';

export interface LineItem {
  product: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  customerName: string;
  orderType: OrderType;
  items: LineItem[];
  gift: {
    message: string;
    wrapStyle: WrapStyle;
  };
  subscription: {
    frequency: DeliveryFrequency;
    startDate: string;
  };
  promo: {
    applyDiscount: boolean;
    code: string;
  };
}

export function createEmptyLineItem(): LineItem {
  return {
    product: '',
    quantity: 1,
    unitPrice: 0,
  };
}

export function createEmptyOrder(): Order {
  return {
    customerName: '',
    orderType: '',
    items: [],
    gift: {
      message: '',
      wrapStyle: '',
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

export const ORDER_TYPE_OPTIONS: Array<{ label: string; value: OrderType }> = [
  { label: 'Standard', value: 'standard' },
  { label: 'Gift', value: 'gift' },
  { label: 'Subscription', value: 'subscription' },
];

export const PRODUCT_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'Coffee beans 1kg', value: 'coffee-1kg' },
  { label: 'Matcha tin 100g', value: 'matcha-100g' },
  { label: 'Cold brew concentrate', value: 'cold-brew' },
  { label: 'Ceramic mug', value: 'mug' },
  { label: 'Reusable filter', value: 'filter' },
];

export const WRAP_STYLE_OPTIONS: Array<{ label: string; value: WrapStyle }> = [
  { label: 'Classic kraft', value: 'classic' },
  { label: 'Premium foil', value: 'premium' },
  { label: 'Eco recycled', value: 'eco' },
];

export const FREQUENCY_OPTIONS: Array<{ label: string; value: DeliveryFrequency }> = [
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
];
