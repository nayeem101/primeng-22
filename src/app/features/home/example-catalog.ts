export type ExampleStatus = 'ready' | 'planned';

export interface ExampleCard {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly tags: readonly string[];
  readonly route: string;
  readonly status: ExampleStatus;
}

export const EXAMPLE_CATALOG: readonly ExampleCard[] = [
  {
    id: 'signal-forms',
    title: 'Signal Forms + PrimeNG',
    summary:
      'A full employee onboarding form covering Signal Forms schemas, async validation, nested groups, arrays, and PrimeNG inputs.',
    tags: ['Signal Forms', 'PrimeNG', 'Validation'],
    route: '/examples/signal-forms',
    status: 'ready',
  },
  {
    id: 'signal-forms-order',
    title: 'Signal Forms · Order Builder',
    summary:
      'Grouped line items in an array with applyEach() validation, and fields that activate from another field via disabled() + applyWhen().',
    tags: ['Signal Forms', 'Arrays', 'Conditional fields'],
    route: '/examples/signal-forms-order',
    status: 'ready',
  },
] as const;
