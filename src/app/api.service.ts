import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Todo {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private ApiUrl = 'https://jsonplaceholder.typicode.com/todos';

  http = inject(HttpClient);

  getData(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.ApiUrl);
  }

  getTodoById(id: number):Observable<Todo>{
    return this.http.get<Todo>(this.ApiUrl + "/" +  id )
  }
}
