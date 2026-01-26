import { Component, inject, OnInit, signal } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { Todo } from "../../model/todo.type";

@Component(
    {
        selector:'app-todos',
        imports:[],
        templateUrl:'./todos.component.html',
        styles: []
    }
)
export class TodosComponent implements OnInit {
    // gather the stuff we will need
    todoService = inject(TodoService)
    todoItems = signal<Array<Todo>>([])

    ngOnInit():void {
        // as this component is initialized we can use our service
        this.todoService.getTodosFromApi()
            .pipe()
            .subscribe()

    }

}