import { Component } from '@angular/core';
import { CounterComponent } from "../../counter/counter.component/counter.component";

@Component({
  selector: 'app-home',
  imports: [CounterComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
// added default here
export default class Home {

  keyUpHandler(event:KeyboardEvent){
    console.log(`user pressed ${event.key}`)
  }
}
