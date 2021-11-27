import axiosInstance from '../config/axiosInstance';
import { Todo } from '../redux/slices/todosSlice';

const BASE_PATH = 'todos';

export function getTodos() {
  return axiosInstance.get<Todo[]>(BASE_PATH);
}

export function postTodo(todo: Todo) {
  return axiosInstance.post<Todo>(BASE_PATH, todo);
}

export function putTodo(todo: Todo) {
  return axiosInstance.put<Todo>(`${BASE_PATH}/{id}`, todo, {
    params: { id: todo.id },
  });
}

export function deleteTodo(todo: Todo) {
  return axiosInstance.delete<Todo>(`${BASE_PATH}/{id}`, {
    params: { id: todo.id },
  });
}
