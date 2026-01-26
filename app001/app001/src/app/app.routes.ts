import { Routes } from '@angular/router';

export const routes: Routes = [
    {//https://angular.dev/guide/routing/define-routes#lazily-loaded-components-and-routes
        path: '',
        pathMatch:'full',
        loadComponent: () => import('./components/home/home/home')
                //  .then((m)=>m.Home) // ...
  },
  {
    path:'todos',
    loadComponent: ()=>{
        return import('')
    }
  }
];
