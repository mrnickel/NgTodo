import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { todoReducer } from './reducers/todo.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects'
import { TodosEffects } from './effects/todos.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore({ todos: todoReducer }), provideAnimationsAsync(), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideEffects(TodosEffects)]
};
