import {
  getState,
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { TodoItem } from './todos.model';
import { computed, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

const lsTodos = 'Todos'

type TodoFilter = 'all' | 'active' | 'completed';

type TodoState = {
  todos: TodoItem[];
  filter: TodoFilter;
  initialized: boolean;
};

const initialState: TodoState = {
  todos: [],
  filter: 'all',
  initialized: false,
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ todos, filter }) => ({
    completedTodos: computed(() =>
      // using shorthand function syntax here
      todos().filter((todoItem) => {
        return todoItem.completed;
      })
    ),
    filteredTodos: computed(() => {
      switch (filter()) {
        case 'completed':
          return todos().filter((todoItem) => {
            return todoItem.completed;
          });
        case 'active':
          return todos().filter((todoItem) => {
            return !todoItem.completed;
          });

        default:
          return todos();
      }
    }),
  })),
  withMethods((store, http = inject(HttpClient)) => ({
    // POST new data to dummy remote  API
    addTodo(newTodoTitle: string) {
      http
        .post<TodoItem>('https://jsonplaceholder.typicode.com/users/1/todos', {
          title: newTodoTitle,
          completed: false,
        })
        // update our local stateful store
        .subscribe((todo) => {
          patchState(store, {
            todos: [todo, ...store.todos()],
          });
        });
    },
    changeFilter(filter: TodoFilter) {
      console.log({ filter });
      patchState(store, {
        filter,
      });
    },
    toggleTodoCompleted(todoId: string) {
      // shorthand version of previous code
      const newCompleted = !store.todos().find((todo) => todo.id === todoId)
        ?.completed;
      // http.PATCH to dummy remote API
      http
        .patch<TodoItem>(
          `https://jsonplaceholder.typicode.com/todos/${todoId}`,
          {
            completed: newCompleted,
          }
        )
        // update local stateful store
        .subscribe(() => {
          patchState(store, {
            todos: store.todos().map((todoItem) => {
              if (todoItem.id === todoId) {
                return {
                  ...todoItem,
                  completed: newCompleted,
                };
              }
              return todoItem;
            }),
          });
        });
    },
  })),
  withHooks({
    onInit(store, http = inject(HttpClient)) {
      effect(() => {
        const state = getState(store);
        console.log('effect: ', state);
        // check if the state has been initialized before persisting in localStorage
        if (state.initialized) {
          localStorage.setItem(lsTodos, JSON.stringify(state.todos));
        }
      });
      // use http.GET to retrieve from dummy remote API
      http
        .get<TodoItem[]>('https://jsonplaceholder.typicode.com/users/1/todos')
        .pipe(
          catchError((error) => {
            console.log('Error fetching todos:', error);
            const todosFromStorage = JSON.parse(
              localStorage.getItem(lsTodos) || '[]'
            );
            return of(todosFromStorage);
          })
        )
        .subscribe((todos) => {
          patchState(store, {
            todos,
            initialized: true,
          });
        });
    },
  })
);
