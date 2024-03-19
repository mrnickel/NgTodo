import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css',
})
export class TodoFormComponent {
  @Output() addTodo = new EventEmitter();
  newTodo: string = '';

  addToDo() {
    this.addTodo.emit(this.newTodo);
    this.newTodo = '';
  }
}
