// see https://angular.dev/guide/routing/data-resolvers
// NB there is an additional import in app.config.ts 'withComponentInputBinding'
// this enables routing params to be treated as simple inputs
import { JsonPipe } from '@angular/common';
import { Component, input } from '@angular/core';

// import type { User, Settings } from './types';
@Component({
  imports:[JsonPipe],
  template: `
    <h1>User {{ user().name }}</h1>
    <p>Email: {{ user().email }} id: {{user().id}}</p>
    <pre>{{user() | json}}</pre>
  `
})
export class UserDetail { // implements OnInit  {
  // old way requires activated route just to get resolved data
  // constructor(private route: ActivatedRoute) { }
  //   resolvedData: any;
  // ngOnInit(): void {
  //   this.resolvedData = this.route.snapshot.data.resolvedData;
  // }

  // here user will be provided by the routing resolver function (no need for activatedroute)
  user = input.required<any>(); // User
}