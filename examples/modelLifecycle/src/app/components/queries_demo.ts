import { Component, computed, viewChild, viewChildren } from '@angular/core';

// see https://angular.dev/guide/components/queries
// this example is incomplete and is not currently used

@Component({
  selector: 'custom-card-header',
  template: `<h2>Custom Card Header</h2>`
})
export class CustomCardHeader {
  text: string = 'header'
}
@Component({
    selector: 'custom-card-action',
    template: `<h3>Custom Card Action</h3>
    <ng-content/>`,
})
export class CustomCardAction {
    text: string = 'action'
}
@Component({
    imports: [CustomCardAction],
    selector: 'custom-card',
    template: `
    <custom-card-action>Save</custom-card-action>
    <custom-card-action>Cancel</custom-card-action>
  `,
})
export class CustomCard {
    header = viewChild(CustomCardHeader);
    headerText = computed(() => this.header()?.text);
    actions = viewChildren(CustomCardAction);
    actionsTexts = computed(() => this.actions().map(action => action.text));
}