import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch:'full',
        loadComponent: () => import('./components/home/home/home')
                 .then((m)=>m.Home) // ...
  },
];
