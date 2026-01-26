import { Component, inject, OnInit, signal } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { Todo } from "../../model/todo.type";
import { catchError } from "rxjs";
import { TodoItem } from "../todo-item/todo-item/todo-item";

@Component(
    {
        selector:'app-todos',
        imports: [TodoItem],
        templateUrl:'./todos.component.html',
        styles: []
    }
)
export default class TodosComponent implements OnInit {
    // gather the stuff we will need
    todoService = inject(TodoService)
    todoItems = signal<Array<Todo>>([])

    ngOnInit():void | string {
        // as this component is initialized we can use our service
        this.todoService.getTodosFromApi()
            .pipe(
                catchError(
                    (err)=>{console.log(err)
                    throw err // return something!!!
                })
            )
            .subscribe( (todos)=>{
                this.todoItems.set(todos)
            } )

    }

}