import { Component, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { increment, decrement, reset, multbyten } from '../counter.actions';

@Component({
  selector: 'ngrx-my-counter',
  template: `
    <button id="increment" (click)="increment()">Increment</button>
    <button id="multbyten" (click)="multbyten()">Mult By Ten</button>

    <div>Current Count: {{ count() }}</div>

    <button id="decrement" (click)="decrement()">Decrement</button>

    <button id="reset" (click)="reset()">Reset Counter</button>
  `,
})
export class MyCounterComponent {

  constructor(){
    // inject into this context
  }

  private readonly store: Store<{ count: number }> = inject(Store);
  count: Signal<number> = this.store.selectSignal((state) => state.count);

  increment() {
    this.store.dispatch(increment());
  }

  multbyten(){
    this.store.dispatch(multbyten())
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
