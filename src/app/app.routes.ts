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
  { path: '**', redirectTo: '' },
];
