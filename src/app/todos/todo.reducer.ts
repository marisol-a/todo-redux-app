import { createReducer, on } from '@ngrx/store';
import {
  create,
  edit,
  remove,
  toggle,
  toggleAll,
  removeCompleted,
} from './todo.actios';
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [
  new Todo('Aprender redux con ngrx'),
  new Todo('Dominar los observables'),
  new Todo('Leer arquitectura limpia'),
];

const _todoReducer = createReducer(
  initialState,
  on(create, (state, { text }) => [...state, new Todo(text)]),
  on(toggle, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      } else {
        return todo;
      }
    });
  }),
  on(edit, (state, { id, text }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text: text,
        };
      } else {
        return todo;
      }
    });
  }),
  on(remove, (state, { id }) => state.filter((todo) => todo.id !== id)),
  on(toggleAll, (state, { completed }) => {
    return state.map((todo) => {
      return {
        ...todo,
        completed: completed,
      };
    });
  }),
  on(removeCompleted, (state) => {
    return state.filter((todos) => !todos.completed);
  })
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
