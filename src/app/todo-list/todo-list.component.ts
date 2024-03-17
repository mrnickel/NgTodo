import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { TodoComponent } from '../todo/todo.component';
import { Todo } from '../models/Todo';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgFor, TodoComponent, TodoFormComponent, AsyncPipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.todos$.subscribe((todos) => (this.todos = todos));
  }

  toggleComplete(todo: Todo) {
    this.todoService.toggleComplete(todo);
  }

  addTodo(newTodo: string) {
    this.todoService.add({
      id: Math.floor(Math.random() * 100),
      title: newTodo,
      complete: false,
    });
  }
}
