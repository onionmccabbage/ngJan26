import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'basic-dashboard',
    template: `
    <section>
    <h3>Basic Dashboad</h3>
    <p>This component is lazy-loaded depending on an injected feature</p>
    <!-- see https://angular.dev/guide/routing/navigate-to-routes -->
    <button (click)="navigateToUser()">View User</button>
    <button (click)="navigateToParent()">Up</button>
    <button (click)="byURL()">Login (by URL)</button>

</section>
    `
})
export class BasicDashboard {
    // progrmatic navigation
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    navigateToUser() {
        // Standard navigation
        // this.router.navigate(['/user']);
        // // With route parameters
        this.router.navigate(['/user', 42]); // with an id value
        // // With query parameters
        // this.router.navigate(['/search'], { // as yet, no such component
        //   queryParams: { category: 'books', sort: 'price' }
        // });
        // With matrix parameters
        // this.router.navigate(['/products', { featured: true, onSale: true }]); // again, no such component to handle this
    }

    navigateToParent() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }
    byURL() {
        this.router.navigateByUrl('/login', {
            replaceUrl: true, // Replace current URL in history

        });
    }
}