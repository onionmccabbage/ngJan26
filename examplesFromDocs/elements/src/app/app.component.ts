import {Component, Injector} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {PopupComponent} from './popup.component';
import {PopupService} from './popup.service';

@Component({
  selector: 'app-root',
  template: `
    <p>For comparison, the demo shows both methods. One button adds the popup using the dynamic-loading method, and the other uses the custom element. The result is the same; only the preparation is different</p>
    <input #input value="Message" />
    <button type="button" (click)="popup.showAsComponent(input.value)">Show as component</button>
    <button type="button" (click)="popup.showAsElement(input.value)">Show as element</button>
  `,
  providers: [PopupService],
  // imports: [PopupComponent],
})
export class AppComponent {
  constructor(
    injector: Injector,
    public popup: PopupService,
  ) {
    // Convert `PopupComponent` to a custom element.
    const PopupElement = createCustomElement(PopupComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('popup-element', PopupElement);
  }
}
