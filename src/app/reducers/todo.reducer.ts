import { ActionReducer, createReducer, on } from '@ngrx/store';
import { deleteTodo, setTodos, todoCreated, todoDeleted, todoToggled } from '../actions/Todo.actions';
import { Todo } from '../models/Todo';

// TODO: Update to normalize data
export interface TodoState {
    todos: Todo[];
}

export const initialState: TodoState = {
    todos: []
};

export const todoReducer: ActionReducer<TodoState> = createReducer(
    initialState,
    on(setTodos, (state: TodoState, { todos }) => {
        return {
            ...state,
            todos: todos || [],
        }
    }),
    on(todoCreated, (state: TodoState, { todo }) => {
        return {
            ...state,
            todos: [...state.todos, todo]
        }
    }),
    on(todoToggled, (state, { todo }) => {
        const mappedTodos = state.todos.map((x) => {
            if (x.id === todo.id) {
                return {
                    ...x,
                    complete: !x.complete,
                };
            }
            return x;
        });

        return {
            ...state,
            todos: [...mappedTodos]
        }
    }),
    on(todoDeleted, (state, { id }) => {
        const filteredTodos = state.todos.filter((x) => {
            return x.id !== id
        })

        return {
            ...state,
            todos: [...filteredTodos]
        }
    })
);