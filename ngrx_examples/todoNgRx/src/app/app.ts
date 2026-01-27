import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoStore } from './store/todos.store';
import { JsonPipe, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SnackbarComponent } from "./components/snackbar/snackbar.component";
import { TodoItem } from './store/todos.model';

// after making the store operate with resource, then edit this file

@Component({
  selector: 'app-root',
  // added the FormsModule so we can use ngModel
  imports: [FormsModule, RouterOutlet, JsonPipe, SnackbarComponent],
  // ...or make the store only available to this component
  // providers:[TodoStore],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  constructor(){
    // can't use effect in onInit of a component
    effect(()=>{
      const allCompleted = this.store.todos().every((todo:TodoItem)=>{ // check to see if every todo is completed
        return todo.completed
      })
      if(allCompleted && this.store.todos().length>0){
        // this.snack() is a signal of snackBarComponent or undefined (hover it to see)
        // this.snack()?.show() 
        // but viewchild.required means it will definitely be there
        // this.snack().show() // currently fails slightly 
      }
    })
  }
// a new signal
  searchTerm = signal('') // then add a search field to the HTML template

  // which user (a signal)
  whichUser = signal('1')

  newTodoTitle = signal('')
  readonly store = inject(TodoStore);
  // function to handle when a new todo is to be added
  addNewTodo(){
    this.store.addTodo(this.newTodoTitle())
    // then reset the input field
    this.newTodoTitle.set('')
  }
  // snack = viewChild(SnackbarComponent)
  snack = viewChild.required(SnackbarComponent) // appears then disappears
}
