import { FilterEnum } from './../../types/filter.enum';
import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class FooterComponent {
  todosService = inject(TodosService);
  filterSig = this.todosService.filterSig;
  filterEnum = FilterEnum;
  activeCount = computed(() => {
    return this.todosService.todoSig().filter(todo => !todo.isCompleted).length;
  });
  noTodosClass = computed(() => this.todosService.todoSig().length === 0);
  itemsLeftText = computed(() => `item${this.activeCount() !== 1 ? 's' : ''} left`)

  changeFilter(event: Event, filterEnum: FilterEnum) {
    event.preventDefault();
    this.todosService.changeFilter(filterEnum);
  }
}
