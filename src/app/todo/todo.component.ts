import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models/Todo';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [NgIf],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  @Input() todo: Todo | undefined;
  @Output() toggleComplete = new EventEmitter();
}
