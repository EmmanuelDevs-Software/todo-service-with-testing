import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit, OnDestroy {
  @Input() todos: any
  todoServices: any;
  constructor(private todoService: TodoService) { }
  
  ngOnDestroy(): void {
    this.init();
    this.completeAll();
    this.inCompleteAll();
  }

  ngOnInit(): void {
    this.init()
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


  completeAll() {
    if (this.todos) {
      this.todos.map((todo: any) => {
        todo.isComplete = true;
        this.todoService.updateToComplete(todo).subscribe(res => res);
        setTimeout(() => {
          this.todoService.findAll().subscribe(res => res)
        }, 100);
      })
    }
  }

  inCompleteAll() {
    if (this.todos) {
      this.todos.map((todo: any) => {
        todo.isComplete = false;
        this.todoService.updateToComplete(todo).subscribe(res => res);
        setTimeout(() => {
          this.todoService.findAll().subscribe(res => res)
        }, 100);
      })
    }
  }

}
