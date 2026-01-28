import { Component, signal } from '@angular/core';

// see https://v19.angular.dev/guide/components/host-elements
// this example is incomplete

@Component({  selector: 'host-binding-demo',
  template: `
  <aside>
    <h3>Host Binding Demo. Value: {{value}}</h3>
    
  </aside>`,
  host: {
    'role': 'slider',
    '[attr.aria-valuenow]': 'value',
    '[class.active]': 'isActive()',
    '[tabIndex]': 'disabled ? -1 : 0',
    '(keydown)': 'updateValue($event)',
  },
})

export class HostBindingDemo {
  value: number = 0;
  disabled: boolean = false;
  isActive = signal(false);
  updateValue(event: KeyboardEvent) { /* ... */ }
  /* ... */
}