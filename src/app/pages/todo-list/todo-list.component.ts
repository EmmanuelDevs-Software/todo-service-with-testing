import { TodoService } from './../../services/todo.service';
import { Todo } from './../../../models/todo.model';
import { Component, OnInit } from '@angular/core';
import { map, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoServices: any;

  todos: Todo | any;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {

  }

}
