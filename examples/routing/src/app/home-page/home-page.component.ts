import { Component, inject, input } from "@angular/core";
import { FeatureFlags } from "../services/feature-flags";
// we need these o grab the static data passed in by routing
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';


@Component({
    selector: 'home-page',
    template: `<section>
    <h3>Home Page Component</h3>
    <button (click)=handleClick()>Toggle Premium: {{flags.getPremiumFlag()}}</button>
    <p>Warning: this toggle uses a DIFFERENT instance of the service to that used in the routing component</p>
    <hr/>
    <p>Some values injected as static data by the routing:</p>
    <ul>
        <li>Mode: {{mode}}</li>
        <li>Year: {{dt()}}</li>
</ul>
</section>`
})
export class HomePage {
    mode: string;
    dt = input.required() // this works due to 'withComponentInputBinding' in app.config
    private route = inject(ActivatedRoute);
    flags = inject(FeatureFlags);
    constructor() {
        this.mode = this.route.snapshot.data['mode'];

        const snapshot = this.route.snapshot;
        console.log({
            url: snapshot.url,           
            // Route parameters object: {id: '123'}
            params: snapshot.params,
            // Query parameters object: {role: 'admin', status: 'active'}
            queryParams: snapshot.queryParams,  // Query parameters
            data: snapshot.data
        });
    }
    handleClick() {
        console.log(this.flags.isPremium())
        this.flags.togglePremium()
    }
}