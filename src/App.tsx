import { nanoid } from 'nanoid';
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './App.module.css';
import Input from './components/Input';
import TodoItem from './components/TodoItem';
import {
  Todo,
  addTodo,
  getAllTodos,
  selectAllTodos,
  removeTodo,
  modifyTodo,
} from './redux/slices/todosSlice';

function App() {
  const [description, setDecription] = useState('');

  const allTodos = useSelector(selectAllTodos);
  const dispatch = useDispatch();

  const onAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTodo({ id: nanoid(), description, done: false }));
    setDecription('');
  };

  const onToogleDone = (todo: Todo) => {
    dispatch(modifyTodo({ ...todo, done: !todo.done }));
  };

  const onRemove = (todo: Todo) => {
    if (confirm('Do you want to remove this item?')) {
      dispatch(removeTodo(todo));
    }
  };

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  return (
    <div className={styles.rootContainer}>
      <form onSubmit={onAdd}>
        <div className={styles.header}>
          <h1>Todos</h1>
          <Input
            fullWidth
            type='text'
            value={description}
            placeholder='Type a todo and hit Enter to add...'
            onChange={(e) => setDecription(e.target.value)}
          />
        </div>
        <ul className={styles.list}>
          {allTodos.map((t: Todo) => (
            <TodoItem
              key={t.id}
              todo={t}
              onToogleDone={onToogleDone}
              onRemove={onRemove}
            />
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
