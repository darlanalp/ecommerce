
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        path: 'home',
        loadChildren: () => import('home').then((m) => m.HomeModule),
    },
    {
        //Observação: loadChildren não funciona com standalone component, utilize o  loadComponent 
        path: 'product',
        loadChildren: () => import('product-detail').then((m) => m.productDetailRoutes),
    }
    ,
];