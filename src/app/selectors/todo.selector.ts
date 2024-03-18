import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { TodoState } from '../reducers/todo.reducer';


export const selectTodos = (state: State) => {
    console.log(state)
    return state.todos;
};

export const selectTodoCount = createSelector(
    selectTodos,
    (state: TodoState) => state.todos.filter(x => !x.complete).length
);

export const selectAllTodos = createSelector(
    selectTodos,
    (state: TodoState) => state.todos
)