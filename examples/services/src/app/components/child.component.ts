import { Component, inject } from "@angular/core";
import { FlowerService } from "../services/flower.service";
import { AnimalService } from "../services/animal.service";
import { InspectorComponent } from "./inspector.component";

@Component({
    selector: 'app-child',
    template: `
  <p>Emoji from FlowerService: {{flower.emoji}}</p>
  <p>Emoji from AnimalService: {{animal.emoji}}</p>

  <div class="container">
  <h3>Content projection</h3>
  <ng-content></ng-content>
</div>
<h3>Inside the view</h3>
<inspector-component />

  `,
    //   templateUrl: './child.component.html',
    //   styleUrls: ['./child.component.css'],
    // use the providers array to provide a service
    // provide services
    providers: [{ provide: FlowerService, useValue: { emoji: '🌻' } }],
    viewProviders: [{ provide: AnimalService, useValue: { emoji: '🐶' } }],
    imports: [InspectorComponent]
})
export class ChildComponent {
    // inject the services
    flower = inject(FlowerService);
    // same thing but with skipSelf
    // flower = inject(FlowerService, { skipSelf: true })

    // animal = inject(AnimalService)
    // same thing but with host
    // animal = inject(AnimalService, { host: true })
  //
  animal = inject(AnimalService, { host: true, skipSelf: true });


}