import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../models/Todo';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { updateTodo } from '../actions/Todo.actions';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo | undefined;
  @Output() toggleComplete = new EventEmitter();
  @Output() deleteTodo = new EventEmitter();

  isEditing = false;
  updatedText = "";

  constructor(private store: Store<State>) {
  }



  ngOnInit(): void {
    this.updatedText = this.todo?.title || "";
  }

  setIsEditing(_isEditing: boolean) {
    this.isEditing = _isEditing;
  }

  saveChanges() {
    console.log(this.todo!.id, this.updatedText);
    this.store.dispatch(updateTodo({ id: this.todo!.id, title: this.updatedText }))
    this.setIsEditing(false);
  }

}
