import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { TodoItem } from './todos.model';
import { computed, effect, inject, resource } from '@angular/core';
// import { rxResource } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http'; //still used for POST and PATCH 
// import { catchError, map, of } from 'rxjs';

const todoStoreKey = 'ng_cookbook_todos';

type TodoFilter = 'all' | 'active' | 'completed';

// resource should not go in state
type TodoState = {
  // after we introduce a resource, we should use it in place of the hard-coded todos stateful model
  // todos: TodoItem[];
  filter: TodoFilter;
  intialized: boolean;
  searchTerm: string // this will contain the UI search term
};

const initialState: TodoState = {
  // todos: [], // no initial todos in state
  filter: 'all',
  intialized: false,
  searchTerm: '', // initialize as an empty string
};
// see https://ngrx.io/guide/signals
// signalStore: A fully-featured state management solution that provides native support for Angular Signals and offers a robust way to manage application state.
export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  // we are putting resource here, before withComputed
  // withProps is part of ngrx signal store
  //        store provides signals such as searchTerm
  // withProps((store, http=inject(HttpClient)) => { // remove the not-needed httpClient
  withProps((store) => {
    // we must return a set of props 
    // leading underscore indicates it is private within the store (nott exposed outside it)
    return {
      // CAREFUL - the resource will react immediately to the intial, empty searchTerm
      // rxResource is observables and will automaticall abort previous calls
      // resource is promise-based so we need to do our own abort
      // of type TodoItem array, string is the trigger which changes, re-calling this resource
      // _todosResource: resource<TodoItem[], string>({
      _todosResource: resource({
        // request: store.searchTerm, // I removed this
        params: () => ({isearchTerm:store.searchTerm()}),
        // loader is a function that accepts parameters and should return an observable
        // we make it async
        loader: async (params) => {
          // extract two things from the incoming params
          //    request is the string, which we alias to searchTerm
          //                      abortSignal also comes from params
          // const { request: searchTerm, abortSignal } = params; // I altered this to remove request
          const { abortSignal } = params;
          try {
            // here we expressly use fetch (no longer httpClient)
            const resp = await fetch(
              `https://jsonplaceholder.typicode.com/users/1/todos`,
              {
                // pass the abortSignal see   https://angular.dev/guide/signals/resource#reactive-data-fetching-with-httpresource
                signal: abortSignal,
              }
            );
            if (resp.status !== 200) {
              throw new Error(resp.status.toString());
            }
            const todos = (await resp.json()) as TodoItem[];
            patchState(store, {
              intialized: true,
            });
            return todos.filter((todo) =>
              todo.title.toLowerCase().includes(store.searchTerm().toLowerCase())
            );
          } catch (err) {
            console.log('Error fetching todos:', err);
            const todosFromStorage = JSON.parse(
              localStorage.getItem(todoStoreKey) || '[]'
            ) as TodoItem[];
            return todosFromStorage;
            throw err;
          }
        },
      }),
    };
  }),
  // we can use our resource to compute the todos
  // (and we remove todos from the following line)
  withComputed(({ filter, _todosResource }) => ({
    // we can compute a todos from our new resource so use trailing value()?
    todos: computed(() => _todosResource.value() || []),// .. but if ther is not yet anything in the resource, return an empty array
    // CAREFUL: the value() of the resource will be undefined unti lwe get some data
    todosLoading: computed(() => _todosResource.isLoading()),
    todosLoadingError: computed(() => _todosResource.error()),
    completedTodos: computed(
      // we replace the store todos with our resource todos
      () =>
        _todosResource.value()?.filter((todoItem) => {
          return todoItem.completed;
        }) || []
    ),
    filteredTodos: computed(() => {
      switch (filter()) {
        case 'completed':
          // again, use the resource in place of the todos state
          // check if there is any value in the resource using hasValue()
          // we could use _todosResource.hasValue() and .defaultValue()
          return (
            _todosResource.value()?.filter((todoItem) => {
              return todoItem.completed;
            }) || []
          );
        case 'active':
          return (
            _todosResource.value()?.filter((todoItem) => {
              return !todoItem.completed;
            }) || []
          );

        default:
          return _todosResource.value() || [];
      }
    }),
  })),
  withMethods((store, http = inject(HttpClient)) => ({
    // after adding the searchTerm field to the HTML template, write the following method    
    updateSearchTerm(st: string) {
      console.log(st)
      patchState(store, {
        searchTerm: st,
      });
    },
    // updateWhichUser((userId:string)=>{
    //   patchState(store, {
    //     whichUser:userId
    //   })
    // }),
    // POST new data to dummy remote  API
    addTodo(newTodoTitle: string) {
      http
        .post<TodoItem>('https://jsonplaceholder.typicode.com/users/1/todos', {
          title: newTodoTitle,
          completed: false,
        })
        // update our local stateful store
        .subscribe((todo) => {
          store._todosResource.update((todos) => {
            if (!todos) {
              return [todo];
            }
            return [todo, ...todos];
          });
        });
    },
    changeFilter(filter: TodoFilter) {
      console.log({ filter });
      patchState(store, {
        filter,
      });
    },
    // shorthand version of previous code
    // use resource in place of stateful todos
    toggleTodoCompleted(todoId: string) {
      const newCompleted = !store._todosResource
        .value()
        ?.find((todo) => todo.id === todoId)?.completed;
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
          store._todosResource.update((todos) => {
            if (!todos) {
              return [];
            }
            return todos.map((todoItem) => {
              if (todoItem.id === todoId) {
                return {
                  ...todoItem,
                  completed: newCompleted,
                };
              }
              return todoItem;
            });
          });
        });
    },
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        const state = getState(store);
        console.log('effect: ', state);
        if (state.intialized) {
          localStorage.setItem(todoStoreKey, JSON.stringify(store.todos()));
        }
      });
    },
  })
);
