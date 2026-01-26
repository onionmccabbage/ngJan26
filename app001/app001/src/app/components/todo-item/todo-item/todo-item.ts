import { Component, input, output, signal } from '@angular/core';
import { Todo } from '../../../model/todo.type';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItem {
    todo = input.required<Todo>()
    todoToggled = output<Todo>()

    // some methods
    todoClicked(){
      this.todoToggled.emit(this.todo())
    }
}
