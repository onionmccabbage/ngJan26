import { Component, input, output } from '@angular/core';
import { Todo } from '../../../model/todo.type'; 
import { UpperCasePipe } from '@angular/common';
import { HighlightCompletedTodoDirective } from '../../../directives/highlight-completed-todo.directive';

@Component({
    selector: 'app-todo-item',
    imports: [HighlightCompletedTodoDirective, UpperCasePipe],
    templateUrl: './todo-item.html',
    styleUrl: './todo-item.scss'
})
export class TodoItemComponent {
  todo = input.required<Todo>();
  todoToggled = output<Todo>();

  todoClicked() {
    this.todoToggled.emit(this.todo());
  }
}
