import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError, withLatestFrom } from 'rxjs/operators';
import { add, deleteTodo, loadTodos, setTodos, todoCreated, todoDeleted, todoToggled, todoUpdated, toggle, updateTodo } from '../actions/Todo.actions';
import { Store } from '@ngrx/store';
import { State } from '../reducers';


@Injectable()
export class TodosEffects {
    loadTodos$ = createEffect(() => this.actions$.pipe(
        ofType(loadTodos),
        map(() => {
            return JSON.parse(localStorage.getItem('items') || '[]')
        }),
        map((todos) => {
            return setTodos({ todos });
        }),
        catchError(() => EMPTY)
    ));

    addTodos$ = createEffect(() => this.actions$.pipe(
        ofType(add),
        withLatestFrom(this.store.select((state: State) => state.todos.todos.length)),
        map(([{ todo }, numTodos]) => {
            return {
                id: numTodos + 1,
                title: todo,
                complete: false,
            };
        }),
        withLatestFrom(this.store.select((state: State) => state.todos.todos)),
        map(([todo, todos]) => {
            const updatedTodos = [...todos, todo];
            localStorage.setItem('items', JSON.stringify(updatedTodos));
            return todoCreated({ todo });
        })
    ))

    toggleTodo$ = createEffect(() => this.actions$.pipe(
        ofType(toggle),
        withLatestFrom(this.store.select((state: State) => state.todos.todos)),
        map(([{ id }, todos]) => {
            const mappedTodos = todos.map((x) => {
                if (x.id === id) {
                    return {
                        ...x,
                        complete: !x.complete,
                    };
                }
                return x;
            });
            const mappedTodo = todos.find(x => x.id === id);
            localStorage.setItem('items', JSON.stringify(mappedTodos));
            return todoToggled({ todo: mappedTodo! });
        })
    ));

    deleteTodo$ = createEffect(() => this.actions$.pipe(
        ofType(deleteTodo),
        withLatestFrom(this.store.select((state: State) => state.todos.todos)),
        map(([{ id }, todos]) => {
            const filteredTodos = todos.filter(x => {
                return x.id !== id;
            })

            localStorage.setItem('items', JSON.stringify(filteredTodos));
            return todoDeleted({ id });
        })
    ));

    updateTodo$ = createEffect(() => this.actions$.pipe(
        ofType(updateTodo),
        withLatestFrom(this.store.select((state: State) => state.todos.todos)),
        map(([{ id, title }, todos]) => {
            const mappedTodos = todos.map((x) => {
                if (x.id === id) {
                    return {
                        ...x,
                        title,
                    };
                }
                return x;
            });

            const updatedTodo = mappedTodos.find(x => x.id === id);
            localStorage.setItem('items', JSON.stringify(mappedTodos));
            return todoUpdated({ todo: updatedTodo! });
        })
    ));

    constructor(
        private actions$: Actions,
        private store: Store<State>
    ) { }
}
