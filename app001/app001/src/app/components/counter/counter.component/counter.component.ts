import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  template: `
  <aside>
  <p>Counter value {{counter()}}</p>
  <button (click)='increment()' >Increase</button> |
  <button (click)='decrement()'>Decrease</button> |
  <button (click)='reset()'>Reset</button>
  </aside>  `,
  styles: [],
})
export class CounterComponent {

  counter = signal(0)

  increment(){
    this.counter.update( (val)=>{ return val+1} )
  }

  decrement(){
   this.counter.update( (val)=>{ return val+1} )

  }

  reset(){
    this.counter.set(0)
  }

}
