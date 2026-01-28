import { Component, input, SimpleChanges } from '@angular/core';

// see https://angular.dev/guide/components/lifecycle
// NB this component is rendered inside signal-demo component
@Component({
  selector : 'lifecycle-demo',
  template : `<aside>
  <h3>Lifecycle Demo</h3>
</aside>`
})
export class LifecycleDemo {
  name = input('');
  ngOnChanges(changes: SimpleChanges<LifecycleDemo>) {
    if (changes.name) {
      console.log(`Previous: ${changes.name.previousValue}`);
      console.log(`Current: ${changes.name.currentValue}`);
      console.log(`Is first ${changes.name.firstChange}`);
    }
  }
}
