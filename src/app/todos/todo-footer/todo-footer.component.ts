import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../../filter/filter.actions';
import { removeCompleted } from '../todo.actios';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.scss',
})
export class TodoFooterComponent implements OnInit {
  currentFilter: actions.validFilters = 'all';
  filters: actions.validFilters[] = ['all', 'completed', 'left'];
  left: number = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.currentFilter = state.filter;
      this.left = state.todos.filter((todos) => !todos.completed).length;
    });
    // this.store.select('filter').subscribe((filter) => {
    //   this.currentFilter = filter;
    // });
  }

  changeFilter(filter: actions.validFilters) {
    this.store.dispatch(actions.setFilter({ filter }));
  }

  clearCompleted() {
    this.store.dispatch(removeCompleted());
  }
}
