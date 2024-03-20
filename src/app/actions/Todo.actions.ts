import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/Todo';

export const add = createAction('[Todo Component] add', props<{ todo: string }>());
export const todoCreated = createAction('[Todo Component] todo created', props<{ todo: Todo }>())
export const toggle = createAction('[Todo Component] toggle', props<{ id: number }>());
export const todoToggled = createAction('[Todo toggled] todo toglled', props<{ todo: Todo }>())
export const setTodos = createAction('[Todo Component] setTodos', props<{ todos: Todo[] }>());
export const loadTodos = createAction('[Todo Component] loadTodos');
export const deleteTodo = createAction('[Todo Component] delete', props<{ id: number }>());
export const todoDeleted = createAction('[Todo Component] todo delete', props<{ id: number }>());
export const updateTodo = createAction('[Todo toggled] todo update', props<{ id: number, title: string }>())
export const todoUpdated = createAction('[Todo toggled] todo updated', props<{ todo: Todo }>())
