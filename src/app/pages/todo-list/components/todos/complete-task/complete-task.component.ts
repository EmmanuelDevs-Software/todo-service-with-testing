import { TodoService } from 'src/app/services/todo.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-complete-task',
  templateUrl: './complete-task.component.html',
  styleUrls: ['./complete-task.component.scss']
})
export class CompleteTaskComponent implements OnInit {

  @Input() 'todoData': any

  //@ts-ignore
  public validations_form: FormGroup;

  constructor(private todoService: TodoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.resetFields()
  }


  resetFields() {
    this.validations_form = this.formBuilder.group({
      isComplete: new FormControl(this.todoData ? this.todoData.isComplete : false, Validators.required),
    });
  }

  onSubmit(value?: any) {

    const data: any = {
      isComplete: value.target.checked,
      id: this.todoData.id,
      title: this.todoData.title,
      updatedAt: this.todoData.updatedAt,
      completed: this.todoData.completed,
    };
    this.todoService.update(data).subscribe(res => res);
    this.todoService.findAll().subscribe(res => res);
  }

}
