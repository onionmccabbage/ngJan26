import { Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'nav-component',
    template: `
    <nav>
        <a routerLink='/'>Home</a> |
        <a routerLink='/admin'>Admin</a> |
        <a routerLink='/user/new'>New User</a> |
        <a routerLink='/user'>User</a> |
        <a routerLink='/user/5'>User 5</a> |
        <!-- use [] when making a dynamic link -->
        <!-- passes to    /user/:id -->
        <a [routerLink]="['/user', fakeID()]">User with data in link</a> |
        <a routerLink='/detail/6'>User Detail 6</a> |
        <br/>
        <a routerLink='/login'>Login</a> |
        <a routerLink='/dashboard'>dashboard</a> |
        <a routerLink='/product'>Product</a> |
        <a routerLink='/product/2'>Product 2</a> |
        <a routerLink='/product/2/info'>Product 2 info</a> |
        <a routerLink='/product/2/reviews'>Product 2 reviews</a> |
        <a routerLink='/missing'>404</a>
  </nav>
    `,
    imports: [RouterLink]
})
export class NavComponent {
    fakeID = signal(99)
}