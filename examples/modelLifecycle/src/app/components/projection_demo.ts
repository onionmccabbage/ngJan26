import { Component, inject } from '@angular/core';

// The <ng-content> element is neither a component nor DOM element. 
// Instead, it is a special placeholder that tells Angular where to render content. 
// Angular's compiler processes all <ng-content> elements at build-time. 
// You cannot insert, remove, or modify <ng-content> at run time. 
// You cannot add directives, styles, or arbitrary attributes to <ng-content>
// see https://v19.angular.dev/guide/components/content-projection


@Component({
    selector: 'custom-card',
    // or <ng-content />
    template: `<dl>
        <ng-content />
        <ng-content select="def-term">
            <p>Default to be overridden</p>
        </ng-content>
        <ng-content select="dd"></ng-content>       
</dl>`,
    
})
export class CustomCard {/* ... */ }