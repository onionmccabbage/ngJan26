import { Component, inject } from "@angular/core";
import { FlowerService } from "../services/flower.service";
import { AnimalService } from "../services/animal.service";

@Component({
    selector: 'inspector-component',
    template: `
    <p>Emoji from FlowerService: {{flower.emoji}}</p>
    <p>Emoji from AnimalService: {{animal.emoji}}</p>`
})



export class InspectorComponent {
    flower = inject(FlowerService);
    animal = inject(AnimalService);
}