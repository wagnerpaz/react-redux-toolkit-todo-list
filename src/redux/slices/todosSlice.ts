import {
  createAsyncThunk,
  createSlice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

import { getTodos, postTodo } from '../../services/todosService';
import { RootState } from '../store';

const NAME_PREFIX = 'todos';

export const getAllTodos = createAsyncThunk(
  `${NAME_PREFIX}/getAllTodos`,
  async () => {
    const response = await getTodos();
    return response.data;
  }
);

export const addTodo = createAsyncThunk(
  `${NAME_PREFIX}/addTodo`,
  async (todo: Todo) => {
    const response = await postTodo(todo);
    return response.data;
  }
);

export const todosSlice = createSlice<State, Reducers>({
  name: NAME_PREFIX,
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodos.fulfilled, (state, { payload }) => {
        state.list = payload;
      })
      .addCase(addTodo.fulfilled, (state, { payload }) => {
        state.list.push(payload);
      });
  },
});

// Action creators are generated for each case reducer function
// export const { } = todosSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAllTodos = (state: RootState) => state.todos.list;

export default todosSlice.reducer;

interface State {
  list: Todo[];
}

type Reducers = SliceCaseReducers<State>;

export interface Todo {
  id: string;
  description: string;
  done: boolean;
}
