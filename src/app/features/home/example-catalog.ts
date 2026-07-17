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
] as const;
