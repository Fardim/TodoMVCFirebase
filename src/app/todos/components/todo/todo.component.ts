import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { TodosService } from '../../services/todos.service';
import { TodosFirebaseService } from '../../services/todos-firebase.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TodoComponent implements OnInit, OnChanges {
  todosService = inject(TodosService);
  todosFirebaseService = inject(TodosFirebaseService);
  @Input({ required: true }) todo!: TodoInterface;
  @Input({ required: true }) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();
  @ViewChild('textInput') textInput?: ElementRef;

  editingText: string  = '';
  
  ngOnInit(): void {
    this.editingText = this.todo.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isEditing'].currentValue) {
      setTimeout(() => {
        this.textInput?.nativeElement.focus();
      }, 0);
    }
  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.editingText = target.value;
  }

  changeTodo(): void {
    const dataToUpdate = {
      text: this.editingText,
      isCompleted: this.todo.isCompleted
    };
    this.todosFirebaseService.updateTodo(this.todo.id, dataToUpdate).subscribe(resp => {
      this.todosService.changeTodo(this.todo.id, this.editingText);
    });
    this.setEditingId.emit(null);
  }

  toggleTodo() {
    const dataToUpdate = {
      text: this.todo.text,
      isCompleted: !this.todo.isCompleted
    };
    this.todosFirebaseService.updateTodo(this.todo.id, dataToUpdate).subscribe(resp => {
      this.todosService.toggleTodo(this.todo.id);
    });
  }

  setTodoInEditMode() {
    this.setEditingId.emit(this.todo.id);
  }

  removeTodo() {
    this.todosFirebaseService.removeTodo(this.todo.id).subscribe(resp => {
      this.todosService.removeTodo(this.todo.id);
    });
  }
}
