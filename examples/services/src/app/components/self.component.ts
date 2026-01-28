import { Component, Self } from "@angular/core";
import { FlowerService } from "../services/flower.service";

@Component({
  selector: 'app-self',
  template:``,
//   templateUrl: './self.component.html',
//   styleUrls: ['./self.component.css'],
  providers: [{provide: FlowerService, useValue: {emoji: '🌷'}}],
})
export class SelfComponent {
  constructor(@Self() public flower: FlowerService) {}
}