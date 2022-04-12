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


  createTodo() {
    let todo = {
      title: "HOla",
      isComplete: true,
      completed: "2022-04-11T10:38:31.739Z",
      updatedAt: "2022-04-11T10:38:31.739Z"
    }
    this.todoService.create(todo).subscribe(res => console.log('ddd',res))
    this.todoService.findAll().subscribe(res => res)
  }

}
