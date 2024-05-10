import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actios';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('fisicInput') fisicInput: ElementRef;
  checkCompleted: FormControl;
  textInput: FormControl;
  editing: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.checkCompleted = new FormControl(this.todo.completed);
    this.textInput = new FormControl(this.todo.text, Validators.required);
    this.checkCompleted.valueChanges.subscribe(() => {
      this.store.dispatch(actions.toggle({ id: this.todo.id }));
    });
  }

  edit() {
    this.editing = true;
    this.textInput.setValue(this.todo.text);
    setTimeout(() => {
      this.fisicInput.nativeElement.select();
    }, 1);
  }

  finishEdition() {
    this.editing = false;
    if (this.textInput.invalid || this.textInput.value === this.todo.text)
      return;
    this.store.dispatch(
      actions.edit({ id: this.todo.id, text: this.textInput.value })
    );
  }

  delete() {
    this.store.dispatch(actions.remove({ id: this.todo.id }));
  }
}
