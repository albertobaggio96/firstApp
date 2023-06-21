import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../type/todo';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  constructor(private http : HttpClient) { }

  getTodos(url : string) : Observable<Todo[]> {
    return this.http.get<Todo[]>(url);
  }

  getTodo(url : string, id : string) : Observable<Todo> {
    return this.http.get<Todo>(`${url}/${id}`);
  }

  createTodo(url : string, body: {title : string}) : Observable<Object>{
    return this.http.post(url, body);
  }

  editTodo(url : string, id : string, body: {title : string}) : Observable<Object>{
    return this.http.patch(`${url}/${id}`, body);
  }

  deleteTodo(url : string, id : string) : Observable<Object>{
    return this.http.delete(`${url}/${id}`);
  }
}
