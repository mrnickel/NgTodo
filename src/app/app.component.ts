import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TodoListComponent } from './todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-todo';
}
