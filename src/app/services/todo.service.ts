import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Todo, TodoCreateDto, TodoUpdateDto } from 'src/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private currentTodoSubject: BehaviorSubject<Todo[]> = new BehaviorSubject({} as Todo[]);
  public readonly currentTodos: Observable<Todo[]> = this.currentTodoSubject.asObservable();

  constructor(private http: HttpClient,
    @Inject('API_URL') private baseUrl: string
  ) { }


  /**
 * Find all
 *
 * @param offset Offset
 * @param limit Limit
 */
  findAll(offset?: number, limit?: number): Observable<Todo[]> {
    return new Observable(observer => {
      const url = `${this.baseUrl}/todos`;
      let params = new HttpParams();
      params = offset ? params.set('offset', `${offset}`) : params;
      params = limit ? params.set('limit', `${limit}`) : params;
      this.http.get<Todo[]>(url, { params }).subscribe(todos => {
        this.currentTodoSubject.next(todos);
        observer.next(todos)
      });
    })
  }

  /**
  * Find
  *
  * @param id ID
  */
  find(id: string): Observable<Todo> {
    const url = `${this.baseUrl}/todos/${id}`;
    return this.http.get<Todo>(url);
  }




  /**
 * Create
 *
 * @param todo Todo
 */
  create(todo: TodoCreateDto): Observable<Todo> {
    return new Observable(observer => {
      const url = `${this.baseUrl}/todos`;
      this.http.post<Todo>(url, todo).subscribe(todo => {
        this.findAll().subscribe(res => res)
        observer.next(todo)
      })
    })
  }

  /**
  * Update
  *
  * @param todo Todo
  */
  update(todo: TodoUpdateDto): Observable<Todo> {
    const url = `${this.baseUrl}/todos/${todo.id}`;
    return this.http.put<Todo>(url, todo);
  }

  /**
  * UpdateToComplete
  *
  * @param todo Todo
  */
  updateToComplete(todo: any): Observable<Todo> {
    const url = `${this.baseUrl}/todos/${todo.id}`;
    return this.http.put<Todo>(url, todo);
  }

  /**
   * Remove
   *
   * @param id ID
   */
  remove(id: string): Observable<string> {
    return new Observable(observer => {
      const url = `${this.baseUrl}/todos/${id}`;
      this.http.delete(url).subscribe(res => res);
      this.findAll().subscribe();
      observer.next('DELETE')
    })

  }


}
