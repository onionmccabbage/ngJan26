import { afterEveryRender, Component, ElementRef, inject } from '@angular/core';

// see https://angular.dev/guide/components/dom-apis

@Component({
  selector: 'dom-api-demo',
  template: `<aside>
      <input id='fname' placeholder="first name" />
      <input id='lname' placeholder="last name" />
    </aside>`
})
export class DomApiDemo {
  constructor() {
    const elementRef = inject(ElementRef);
    afterEveryRender(() => {
      // Focus the first input element in this component.
      elementRef.nativeElement.querySelector('input')?.focus();
      // here we select by id
      // elementRef.nativeElement.querySelector('#lname')?.focus();
    });
  }
}