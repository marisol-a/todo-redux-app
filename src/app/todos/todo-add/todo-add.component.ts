import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as actions from '../todo.actios';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.scss',
})
export class TodoAddComponent {
  textInput: FormControl;

  constructor(private store: Store) {
    this.textInput = new FormControl('', Validators.required);
  }

  add() {
    if (this.textInput.invalid) return;
    this.store.dispatch(actions.create({ text: this.textInput.value }));
    this.textInput.reset();
  }
}
