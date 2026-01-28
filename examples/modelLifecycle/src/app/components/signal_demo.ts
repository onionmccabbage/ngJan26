import { Component, signal } from '@angular/core';
import { computed, untracked } from "@angular/core";
import { LifecycleDemo } from "./lifecycle_demo";

// see https://blog.angular-university.io/angular-signals/
// computed and effect operate in reacative context


@Component({
    selector: "signal-demo",
    template: `
  <h3>Counter value {{counter()}}</h3>
  <p>Ceiling: {{counterCeiling()}}</p>
  <h3>10x counter: {{derivedCounter()}}</h3>
  <!-- Angular automatically updates DOM properties and attribute when the bound value changes -->
  <!--                          [disabled] same as older [attr.disabled] -->
  <button (click)="increment()" [disabled]="counterCeiling()">Increment</button>
  <hr/>
  <p>First Name: {{firstName()}}, caps: {{firstNameCapitalized()}} </p>
  <button (click)="changeFirstName($event)">Change FirstName</button>
  <hr/>
  <lifecycle-demo name={{firstName()}} />

    `,
    imports: [LifecycleDemo]})
export class SignalDemoComponent {

    counter = signal(0);
    derivedCounter = computed(() => {
        return this.counter() * 10;
        // or 
        // return untracked(this.counter) * 10;
    })
    counterCeiling = computed(()=>{
        return this.counter()>10
    })

    increment() {
        console.log(`Updating counter...`)
        this.counter.set(this.counter() + 1);
    }

    // computed signal is read-only see https://v19.angular.dev/essentials/signals
    firstName = signal('Morgan');
    firstNameCapitalized = computed(() => this.firstName().toUpperCase());

    changeFirstName(e:Event) { // e will be the built-in Angular $event object
        this.firstName.set('Jaime')
        console.log(e.target)
    }

}

// also see https://blog.angulartraining.com/whats-the-untracked-function-angular-signals-c08d28b92d57
// he says As a result, I’d recommend using untracked every time a computed function or effect calls
// external code unless we know that we want to depend on other signals read by such
// external code.
// See related code running here
// https://stackblitz.com/edit/at-ng-untracked?file=src%2Fmain.ts