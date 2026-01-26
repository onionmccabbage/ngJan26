import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
// added default here
export class Home {

  keyUpHandler(event:KeyboardEvent){
    console.log(`user pressed ${event.key}`)
  }
}
