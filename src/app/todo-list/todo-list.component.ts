import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { TodoComponent } from '../todo/todo.component';
import { Todo } from '../models/Todo';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { Store } from '@ngrx/store';
import { add, deleteTodo, loadTodos, toggle } from '../actions/Todo.actions'
import { Observable } from 'rxjs';
import { selectAllTodos, selectTodoCount } from '../selectors/todo.selector';
import { State } from '../reducers'
//@ts-ignore
import  lengthOfString from '@mrnickel/poc-library-test'


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgFor, TodoComponent, TodoFormComponent, AsyncPipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;
  numTodos$: Observable<number>;

  constructor(private store: Store<State>) {
    this.todos$ = store.select(selectAllTodos);
    this.numTodos$ = store.select(selectTodoCount)
    console.log('lengthOfString', lengthOfString('hello'))
  }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
  }

  toggleComplete(todo: Todo) {
    console.log('toggle', todo);
    this.store.dispatch(toggle({ id: todo.id }));
  }

  addTodo(newTodo: string) {
    this.store.dispatch(add({ todo: newTodo }));
  }

  deleteTodo1(id: number) {
    console.log('delete', id)
    this.store.dispatch(deleteTodo({ id }))
  }
}
