import { Component, inject } from '@angular/core';
import { BasicDataStore } from '../services/basic-data-store';
@Component({
  selector: 'example-component',
  template: `
    <div>
      <p>{{ dataStore.getData() }}</p>
      <button (click)="dataStore.addData('More data')">
        Add more data
      </button>
    </div>
  `
})
export class ExampleComponent {
  dataStore = inject(BasicDataStore);
}