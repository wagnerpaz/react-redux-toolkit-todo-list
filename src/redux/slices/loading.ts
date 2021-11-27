import {
  CaseReducer,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { RootState } from '../store';

export const LoadingSlice = createSlice<Map<string, number>, Reducers>({
  name: 'loading',
  initialState: new Map(),
  reducers: {
    incrementLoadingCount(state, action) {
      state.set(action.payload, state.get(action.payload) || 0 + 1);
    },
    decrementLoadingCount(state, action) {
      state.set(
        action.payload,
        Math.max(state.get(action.payload) || 0 - 1, 0)
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementLoadingCount, decrementLoadingCount } =
  LoadingSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAllTodos = (state: RootState) => state.todos.list;

export default LoadingSlice.reducer;

interface Reducers extends SliceCaseReducers<Map<string, number>> {
  incrementLoadingCount: CaseReducer<
    Map<string, number>,
    PayloadAction<string>
  >;
}
