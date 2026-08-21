import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
    title: 'Examples',
  },
  {
    path: 'examples/signal-forms',
    loadComponent: () =>
      import('./features/signal-forms-demo/signal-forms-demo.page').then(
        (m) => m.SignalFormsDemoPage,
      ),
    title: 'Signal Forms + PrimeNG',
  },
  {
    path: 'examples/signal-forms-order',
    loadComponent: () =>
      import('./features/order-builder-demo/order-builder.page').then((m) => m.OrderBuilderPage),
    title: 'Signal Forms · Order Builder',
  },
  { path: '**', redirectTo: '' },
];
