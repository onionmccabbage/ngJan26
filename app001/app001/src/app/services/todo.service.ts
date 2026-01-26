import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo } from '../model/todo.type';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject( HttpClient )
  // declare anything we may wish to do
  getTodosFromApi(){
    const url =  `https://jsonplaceholder.typicode.com/todos`
    // return this.http.get<Todo[]>
    return this.http.get<Array<Todo>>(url)

  }
}
