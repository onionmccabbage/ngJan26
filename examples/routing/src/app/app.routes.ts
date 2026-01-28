import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot, Routes } from '@angular/router';
import { HomePage } from './home-page/home-page.component';
import { AdminPage } from './app-admin/app-admin.component';
import { UserProfile } from './user-profile/user-profile';
import { NotFound } from './not-found/not-found.component';
import { UserNew } from './user-new/user-new.component';
import { FeatureFlags } from './services/feature-flags';
import { Inject, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { MockUserService } from './services/mock-user.service';
import { UserDetail } from './user-detail/user-detail.component';
import { ProductComponent } from './components/product.component';
import { ProductInfoComponent } from './components/product-info.component';
import { ProductReviewsComponent } from './components/product-reviews.component';

// When you define a route with the component property, 
// the referenced component is eagerly loaded as part of the same JavaScript bundle as the route configuration
// see https://angular.dev/guide/routing/define-routes

// also see https://stackblitz.com/edit/secondary-segments-demo?file=src%2Fapp%2Fapp.component.html

// resolvers (also see https://dev.to/railsstudent/retrieve-route-data-with-resolver-function-in-angular-12nf)
// NB Class Resolvers are deprecated from Angular 16
// this could be in a separate module
export const userResolver: ResolveFn<any> = ( // get rid of 'any'
    route: ActivatedRouteSnapshot,
) => {
    const userStore = inject(MockUserService); // CAREFUL: inject not Inject!!!
    const userId = route.paramMap.get('id')!; // ! means we guarantee it will not be null or undefined
    // here a service could get all the details for the given ID
    return userStore.getOneUser(userId);
    // return inject(MockUserService).getOneUser(userId); // can do it in one line
    // return {id:userId, name:'Ethel', email:'skronk@gibbon.ie', level:'admin'} // can return literal for debugging
};


// The page title property can be set dynamincally to a resolver function using ResolveFn.
// also see https://angular.dev/guide/routing/define-routes#using-titlestrategy-for-page-titles for a more advanced solution
const userTitleResolver: ResolveFn<string> = (route) => {
    const userId = route.paramMap.get('id');
    return `User Profile for ${userId}`
}

// we can separate out a route as an object and refer to this object in the routing array
const adminPage = {
    path: 'admin',
    component: AdminPage,
    title: 'Admin Page', // always provide for ARIA. Angular automatically updates the page title when a route activates
};

export const routes: Routes = [
    adminPage,
    // Be careful if configuring a redirect on the root page (i.e., "/" or ""). 
    // If you do not set pathMatch: 'full', the router will redirect all URLs.
    // see https://angular.dev/guide/routing/redirecting-routes
    {
        path: '',
        component: HomePage,
        title: 'Home Page',
        data: { mode: 'demo', dt: 2026 }, // inject static data into routed component
        outlet:'some-content'
    },
    // redirect to a different route
    // {
    //     path: 'home',
    //     redirectTo: '/',
    //     pathMatch:'full' // without this routing is suspect
    // },
    { path: 'user/new', component: UserNew, title: 'New User' }, // Static, most specific
    // a route with a route parameter (must come after the more specific static route above)
    { path: 'user/:id', component: UserProfile, title: userTitleResolver }, // Dynamic
    { path: 'user', component: UserProfile, title: userTitleResolver }, // less specific (static)
    {
        path: 'detail/:id',
        resolve: {
            user: userResolver,
        },
        // any time we are resolving data we use this syntax
        loadComponent: () => import('./user-detail/user-detail.component').then((m) => m.UserDetail),
        title: userTitleResolver,
    },

    // lazy load.  this function uses the standard JavaScript dynamic import API
    // compare size of main.js and see lazy-loaded in network tab
    {
        path: 'login',
        loadComponent: () => import('./components/auth/login-page').then((m) => m.LoginPage),
        title: 'Login Page',
    },
    // inject into lazy-loaded component
    {
        path: 'dashboard',
        // Runs inside the route's injection context
        loadComponent: () => {
            // CAREFUL - this component will have it's own copy of the FeatureFlags service, not dependent upon the global one
            const flags = inject(FeatureFlags);
            return flags.isPremium()
                ? import('./dashboard/premium-dashboard').then((m) => m.PremiumDashboard)
                : import('./dashboard/basic-dashboard').then((m) => m.BasicDashboard);
        },
        title: 'Dashboard',
    },
    {
        path: 'product', component: ProductComponent // this will result in the default id of zero
    },
    // nested/child routing
    {
        path: 'product/:id',
        component: ProductComponent,
        children: [
            {
                path: 'info',
                component: ProductInfoComponent,
                // route for product/:id/info
                outlet: 'primary' // this is the default (implicit) name of an un-named router-outlet
                
            },
            {
                path: 'reviews',
                component: ProductReviewsComponent,
                outlet: 'more-content' // targets a named outlet in the PARENT component
            },
        ],
    },

    // wildcard route for any uncaught routes (disable for debugging)
    // { path: '**', component: NotFound, title: 'Not Found' }, // least specific, always the last entry

];
