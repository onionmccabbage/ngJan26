import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, multbyten } from './counter.actions';

export const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(multbyten, (state) => state * 10),
  on(decrement, (state) => state - 1),
  on(reset, () => 0)
);
