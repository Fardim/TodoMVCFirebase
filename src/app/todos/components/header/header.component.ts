import { TodosFirebaseService } from '../../services/todos-firebase.service';
import { TodosService } from './../../services/todos.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent {
  todosService = inject(TodosService);
  todosFirebaseService = inject(TodosFirebaseService);
  text: string = '';

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTodo(): void {
    this.todosFirebaseService.addTodo(this.text).subscribe(addedTodoId => {
      this.todosService.addTodo(this.text, addedTodoId);
      this.text = '';
    });
  }
}
