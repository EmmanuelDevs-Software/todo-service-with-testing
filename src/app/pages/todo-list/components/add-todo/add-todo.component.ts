import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit, OnDestroy {

  //@ts-ignore
  public validations_form: FormGroup;

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) { }
  ngOnDestroy(): void {
    this.onSubmit()
  }

  ngOnInit(): void {
    this.resetFields()
  }


  resetFields() {
    this.validations_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
    });
  }


  onSubmit(value?: any) {

    const data: any = {
      title: value.title,
      isComplete: false,
      completed: new Date(),
      updatedAt: new Date()
    };

    this.todoService.create(data).subscribe(res => res);
    this.todoService.findAll().subscribe(res => res);
  }


}
