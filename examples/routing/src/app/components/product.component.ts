import { Component, input } from "@angular/core"
import { RouterOutlet } from "@angular/router"

@Component({
    selector: 'product-component',
    imports: [RouterOutlet],
    template: `
    <article>
      <h1>Product {{ id() }}</h1>
      <router-outlet/>
      <hr/>
      <router-outlet name="more-content"></router-outlet>
    </article>
    `
})
export class ProductComponent {
    // for any routed component, set a breakpoint here, and inspect the router service via this.router

    id = input.required(
        // see https://angular.dev/guide/routing/common-router-tasks
        { transform: (maybeUndefined: string | undefined) => maybeUndefined ?? '0', }
    )
}