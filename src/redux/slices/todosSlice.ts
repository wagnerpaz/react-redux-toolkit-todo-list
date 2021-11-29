import {
  createAsyncThunk,
  createSlice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

import {
  getTodos,
  postTodo,
  deleteTodo,
  putTodo,
} from '../../services/todosService';
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

export const modifyTodo = createAsyncThunk(
  `${NAME_PREFIX}/modifyTodo`,
  async (todo: Todo) => {
    const response = await putTodo(todo);
    return response.data;
  }
);

export const removeTodo = createAsyncThunk(
  `${NAME_PREFIX}/removeTodo`,
  async (todo: Todo) => {
    await deleteTodo(todo);
    return todo;
  }
);

export const todosSlice = createSlice<State, Reducers>({
  name: NAME_PREFIX,
  initialState: {
    list: [],
    loading: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodos.fulfilled, (state, { payload }) => {
        state.list = payload;
      })
      .addCase(addTodo.fulfilled, (state, { payload }) => {
        state.list.push(payload);
      })
      .addCase(modifyTodo.fulfilled, (state, { payload }) => {
        state.list = state.list.map((t) => (t.id === payload.id ? payload : t));
      })
      .addCase(removeTodo.fulfilled, (state, { payload }) => {
        state.list = state.list.filter((t) => t.id !== payload.id);
      })
      .addMatcher(
        (action) => action?.meta?.requestStatus === 'pending',
        (state, { meta: { requestId, arg } }) => {
          state.loading.push({ requestId, payload: arg });
        }
      )
      .addMatcher(
        (action) => action?.meta?.requestStatus === 'fulfilled',
        (state, { meta: { requestId } }) => {
          state.loading = state.loading.filter(
            (l) => l.requestId !== requestId
          );
        }
      )
      .addMatcher(
        (action) => action?.meta?.requestStatus === 'rejected',
        (state, { meta: { requestId } }) => {
          state.loading = state.loading.filter(
            (l) => l.requestId !== requestId
          );
        }
      );
  },
});

// Action creators are generated for each case reducer function
// export const { } = todosSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAllTodos = (state: RootState) => state.todos.list;
export const selectLoadingTodoIds = (state: RootState) => state.todos.loading;

export default todosSlice.reducer;

interface State {
  list: Todo[];
  loading: Loading[];
}

interface Loading {
  requestId: string;
  payload?: any;
}

type Reducers = SliceCaseReducers<State>;

export interface Todo {
  id: string;
  description: string;
  done: boolean;
}
