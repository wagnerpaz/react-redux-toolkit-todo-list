import { nanoid } from 'nanoid';
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.module.css';
import {
  addTodo,
  getAllTodos,
  selectAllTodos,
} from './redux/slices/todosSlice';

function App() {
  const [description, setDecription] = useState('');

  const allTodos = useSelector(selectAllTodos);
  const dispatch = useDispatch();

  const onAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTodo({ id: nanoid(), description, done: false }));
  };

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  return (
    <>
      <h1>Todos</h1>
      <form onSubmit={onAdd}>
        <input
          type='text'
          value={description}
          onChange={(e) => setDecription(e.target.value)}
        />
        <button type='submit'>Add</button>
        <ul>
          {allTodos.map((t: any) => (
            <li key={t.id}>{t.description}</li>
          ))}
        </ul>
      </form>
    </>
  );
}

export default App;
