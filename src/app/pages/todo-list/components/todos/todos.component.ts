import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {
  todoServices: any;
  todos: Todo | any;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.todoService.findAll().subscribe(() => {
      this.todoServices = this.todoService.currentTodos.subscribe(
        (todos: any) => {
          this.todos = todos;
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.init();
  }


  deleteTodo(id: string) {
    this.todoService.remove(id).subscribe(res => res);
    this.todoService.findAll().subscribe(res => res)
  }

}
