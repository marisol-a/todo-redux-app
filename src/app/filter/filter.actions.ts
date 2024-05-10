import { createAction, props } from '@ngrx/store';

export type validFilters = 'all' | 'completed' | 'left';

export const setFilter = createAction(
  '[FILTER] Set filter',
  props<{ filter: validFilters }>()
);
