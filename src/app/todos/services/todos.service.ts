import { Injectable, signal } from '@angular/core';
import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todoSig = signal<TodoInterface[]>([]);
  filterSig = signal<FilterEnum>(FilterEnum.all);
  constructor() { }

  changeFilter(filterName: FilterEnum) {
    this.filterSig.set(filterName);
  }

  addTodo(text: string, id: string) {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: id,
    };

    this.todoSig.update(todos => [...todos, newTodo]);
  }

  changeTodo(id: string, text: string) {
    this.todoSig.update(todos => todos.map(todo => todo.id === id ? {...todo, text: text} : todo));
  }

  removeTodo(id: string) {
    this.todoSig.update(todos => todos.filter(todo => todo.id !== id));
  }

  toggleTodo(id: string) {
    this.todoSig.update(todos => todos.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo));
  }

  toggleAll(isCompleted: boolean) {
    this.todoSig.update(todos => todos.map(todo => ({...todo, isCompleted: isCompleted })));
  }
}
