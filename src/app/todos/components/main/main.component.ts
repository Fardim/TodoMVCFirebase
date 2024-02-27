import { Component, computed, inject } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';
import { TodosFirebaseService } from '../../services/todos-firebase.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [CommonModule, TodoComponent],
})
export class MainComponent {
  todosService = inject(TodosService);
  todosFirebaseService = inject(TodosFirebaseService);
  editingId: string | null = null;

  visibleTodos = computed(() => {
    const todos = this.todosService.todoSig();
    const filter = this.todosService.filterSig();
    if(filter === FilterEnum.active) {
      return todos.filter(todo => !todo.isCompleted);
    } else if (filter === FilterEnum.completed) {
      return todos.filter(todo => todo.isCompleted);
    }
    return todos;
  });
  isAllTodosSelected = computed(() => this.todosService.todoSig().every(todo => todo.isCompleted));
  noTodosClass = computed(() => this.todosService.todoSig().length === 0);

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }
  
  toggleAllTodos(event: Event) {
    const target = event.target as HTMLInputElement;
    const requests$ = this.todosService.todoSig().map(todo => {
      return this.todosFirebaseService.updateTodo(todo.id, {text: todo.text, isCompleted: target.checked});
    });
    forkJoin(requests$).subscribe(resp => {
      this.todosService.toggleAll(target.checked);
    });
  }
}
