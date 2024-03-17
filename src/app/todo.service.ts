import { Injectable } from '@angular/core';
import { Todo } from './models/Todo';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _todos = new BehaviorSubject<Todo[]>([]);
  todos$ = this._todos.asObservable();
  constructor() {
    const todos = JSON.parse(localStorage.getItem('items') || '[]');
    this._todos.next(todos);
  }

  add(todo: Todo) {
    const todos = [...this._todos.getValue(), todo];
    this._todos.next(todos);
    localStorage.setItem('items', JSON.stringify(todos));
  }

  toggleComplete(todo: Todo) {
    const todos = this._todos.getValue().map((x) => {
      if (x.id === todo.id) {
        return {
          ...x,
          complete: !x.complete,
        };
      }
      return x;
    });
    localStorage.setItem('items', JSON.stringify(todos));
    this._todos.next(todos);
  }
}
