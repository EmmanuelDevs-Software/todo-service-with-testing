import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo, TodoCreateDto, TodoUpdateDto } from 'src/models/todo.model';

import { TodoService } from './todo.service';


export const dataMocked: Todo[] = [
  {
    id: '1',
    title: 'test1',
    completed: true,
    createdAt: 1000000,
    updatedAt: 2000000,
  },
  {
    id: '2',
    title: 'test2',
    completed: true,
    createdAt: 1000000,
    updatedAt: 2000000,
  },
  {
    id: '3',
    title: 'test3',
    completed: true,
    createdAt: 1000000,
    updatedAt: 2000000,
  },
];




describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ], providers: [
        TodoService,
        { provide: 'API_URL', useValue: '' }
      ]
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * FIND ALL TESTS
   */

  it('Should success find all request', () => {
    service.findAll().subscribe((response) => {
      expect(response).toBe(dataMocked)
    })

    const req = httpMock.expectOne(`/todos`);
    expect(req.request.method).toEqual('GET');
    req.flush(dataMocked)
  });

  it('Should success find all request with Params', () => {

    const offsetParam = 1;
    const limitParam = 50;

    service.findAll(offsetParam, limitParam).subscribe((data) => {
      expect(data).toBe(dataMocked);
    });

    const req = httpMock.expectOne(`/todos?offset=${offsetParam}&limit=${limitParam}`)
    expect(req.request.method).toEqual('GET');
    req.flush(dataMocked);
  });

  /**
   * END FIND ALL TESTS
   */


  /**
   * FIND TODO By Id TESTS
   */

  it('Find a request by id', () => {
    const todo: Todo = {
      id: '1',
      title: 'test1',
      completed: true,
      createdAt: 1000000,
      updatedAt: 2000000,
    };

    service.find(todo.id).subscribe((response) => {
      expect(response).toEqual(todo)
    })
    const req = httpMock.expectOne(`/todos/${todo.id}`)
    expect(req.request.method).toEqual('GET');
    req.flush(todo);
  });

  /**
    * END FIND TODO By Id TESTS
    */

  /**
   * Create Todo
   */

  it('Should successfully mock create request', () => {
    const task: TodoCreateDto = {
      title: 'testMockSpected',
    };
    const todo: Todo = {
      id: '1',
      title: 'testMockSpected',
      completed: true,
      createdAt: 1000000,
      updatedAt: 2000000,
    };

    service.create(task).subscribe((response) => {
      expect(response).toEqual(todo)
    });

    const req = httpMock.expectOne(`/todos`);
    expect(req.request.method).toEqual('POST');
    req.flush(todo);

  });


  /**
  * END FIND CREATE TODO
  */

  /**
     *  UPDATE TODO
     */

  it('Should successfully mock update request', () => {
    const task: TodoUpdateDto = {
      id: '1',
      title: 'testMockUpdate',
      completed: true,
    };
    const todo: Todo = {
      id: '1',
      title: 'testMockUpdate',
      completed: true,
      createdAt: 1000000,
      updatedAt: 2000000,
    };

    service.update(task).subscribe((response) => {
      expect(response).toEqual(todo)
    });

    const req = httpMock.expectOne(`/todos/${task.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(todo);
  });

  /**
    * END UPDATE TODO
    */


  /**
      *  UPDATE TO COMPLETE 
      */
  it('Should successfully All to Complete update request', () => {
    const task: TodoUpdateDto = {
      id: '1',
      title: 'testMockUpdateStatus',
      completed: false,
    };
    const todoComplete: Todo = {
      id: '1',
      title: 'testMockUpdateStatus',
      completed: true,
      createdAt: 1000000,
      updatedAt: 2000000,
    };

    service.updateToComplete(task).subscribe((response) => {
      expect(response).toEqual(todoComplete)
    });



    const req = httpMock.expectOne(`/todos/${task.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(todoComplete);
  });

  /**
    * END  UPDATE TO COMPLETE 
    */

  /**
* DELETE TODO
*/

  it('should successfully mock remove request', () => {
    const id = '1';
    service.remove(id).subscribe((data) => {
      expect(data).toEqual(id);
    });
    const req = httpMock.expectOne(`/todos/${id}`);
    expect(req.request.method).toEqual('DELETE');
  });


  /**
* END DELETE TODO
*/

  /**
* DELETE TODO ALL
*/

  it('should successfully mock remove request', () => {
    service.removeAll().subscribe((data) => {
      expect(data).toEqual(true);
    });
    const req = httpMock.expectOne(`/todos`);
    expect(req.request.method).toEqual('DELETE');
  });


  /**
  * END DELETE TODO ALL
  */

});
