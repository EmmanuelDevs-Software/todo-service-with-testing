import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoListComponent } from './todo-list.component';
import { RouterModule } from '@angular/router';
import { TodosComponent } from './components/todos/todos.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompleteTaskComponent } from './components/todos/complete-task/complete-task.component';
import { ControlsComponent } from './components/controls/controls.component';


@NgModule({
  declarations: [
    TodoListComponent,
    TodosComponent,
    AddTodoComponent,
    CompleteTaskComponent,
    ControlsComponent 
  ],
  imports: [
    CommonModule,
    TodoListRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: TodoListComponent
      }
    ]),
  ],
  providers: [
    TodosComponent,
    AddTodoComponent,
    ControlsComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class TodoListModule { }
