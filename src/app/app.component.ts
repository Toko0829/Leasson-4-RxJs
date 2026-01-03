import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ApiService } from './api.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, fromEvent, map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Leasson4RxJs';

  @ViewChild('randomBtn') randomBtn!: ElementRef;

  apiService = inject(ApiService);

  evenTodos$ = this.apiService
    .getData()
    .pipe(map((todos) => todos.filter((todo) => todo.id % 2 === 0)));

  randomTodo$!: Observable<any>;

  private counterSubject = new BehaviorSubject<number>(1);
  counter$ = this.counterSubject.asObservable();

  counterTodo$ = this.counter$.pipe(
    switchMap((id) => this.apiService.getTodoById(id))
  );

  ngAfterViewInit() {
    this.randomTodo$ = fromEvent(this.randomBtn.nativeElement, 'click').pipe(
      map(() => Math.floor(Math.random() * 200) + 1),
      switchMap((id) => this.apiService.getTodoById(id))
    );
  }

  increment() {
    this.counterSubject.next(this.counterSubject.value + 1);
  }

  decrement() {
    if (this.counterSubject.value > 1) {
      this.counterSubject.next(this.counterSubject.value - 1);
    }
  }
}
