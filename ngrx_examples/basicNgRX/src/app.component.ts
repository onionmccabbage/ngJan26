import { Component } from '@angular/core';
// 👇 Import the counter component
import { MyCounterComponent } from './my-counter/my-counter.component';
// from https://ngrx.io/guide/store
// NB to run, use npm run start
@Component({
  selector: 'ngrx-root',
  // 👇 Add the counter component to the imports
  imports: [MyCounterComponent],
  template: `
    <h1>NgRx Tutorial</h1>

    <!-- 👇 add the counter component -->
    <ngrx-my-counter></ngrx-my-counter>
  `,
})
export class AppComponent {}
