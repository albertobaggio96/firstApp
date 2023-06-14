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
}
