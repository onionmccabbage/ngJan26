import { Component, inject, OnInit, signal } from '@angular/core';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../../pipes/filter-todos.pipe';
import { Todo } from '../../model/todo.type';
import { TodoItemComponent } from '../todo-item/todo-item/todo-item';
import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'app-todos',
    imports: [TodoItemComponent, FormsModule, FilterTodosPipe],
    templateUrl: './todos.component.html',
    styles: []
})
export default class TodosComponent implements OnInit {
  todoService = inject(TodoService);
  todoItems = signal<Array<Todo>>([]);
  searchTerm = signal('');

  ngOnInit(): void {
    this.todoService
      .getTodosFromApi()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((todos) => {
        this.todoItems.set(todos);
      });
  }

  updateTodoItem(todoItem: Todo) {
    this.todoItems.update((todos) => {
      return todos.map((todo) => {
        if (todo.id === todoItem.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    });
  }
}
