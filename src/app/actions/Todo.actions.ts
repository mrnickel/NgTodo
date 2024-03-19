import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/Todo';

export const add = createAction('[Todo Component] add', props<{ todo: string }>());
export const todoCreated = createAction('[Todo Component todo created', props<{ todo: Todo }>())
export const toggle = createAction('[Todo Component] toggle', props<{ id: number }>());
export const todoToggled = createAction('[Todo toggled] todo toglled', props<{ todo: Todo }>())
export const setTodos = createAction('[Todo Component] setTodos', props<{ todos: Todo[] }>());
export const loadTodos = createAction('[Todo Component] loadTodos');