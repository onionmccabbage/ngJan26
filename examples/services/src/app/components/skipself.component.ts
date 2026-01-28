import { Component, inject } from "@angular/core";
import { LeafService } from "../services/leaf.service";

@Component({
  selector: 'app-skipself',
  template:``,
  // templateUrl: './skipself.component.html',
  // styleUrls: ['./skipself.component.css'],
  // Angular would ignore this LeafService instance
  providers: [{ provide: LeafService, useValue: { emoji: '🍁' } }]
})
export class SkipselfComponent {
  // Use skipSelf as inject option
  public leaf = inject(LeafService, {skipSelf: true});
}