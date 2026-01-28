import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'user-ptofile',
    template: `<section>
    <h3>User Profile Component</h3>
    @if (userId()) {
        <p>Welcome to the profile page for user {{userId()}}</p>
    }
</section>`
})
export class UserProfile {
    private activatedRoute = inject(ActivatedRoute);
    // readonly userId: string | null; // null before route parameter exists
    // a better solution is to use signal (but see otehr e.g. that use input)
    userId = signal('') // then we do not need to use activatedRoute
    constructor() {
        console.log(this.activatedRoute);
        // this.userId = this.activatedRoute.snapshot.paramMap.get('id');
        this.activatedRoute.params.subscribe((params) => {
            this.userId.set(params['id']);
        });
        // Access multiple route elements
        const snapshot = this.activatedRoute.snapshot;
        console.log({
            url: snapshot.url,
            // Route parameters object: {id: '123'}
            params: snapshot.params,
            // Query parameters object: {role: 'admin', status: 'active'}
            queryParams: snapshot.queryParams,  // Query parameters
        });
    }

}