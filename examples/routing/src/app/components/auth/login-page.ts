import { Component } from "@angular/core";

@Component({
    selector:'login-page',
    template:`
    <section>
    <h3>Login Page</h3>
    <p>This component is lazy-loaded only when needed (in this case, by routing)</p>
</section>
    `
})
export class LoginPage{

}