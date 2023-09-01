// Dependencies
import { useState } from 'react';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import './App.scss';
import AppBar from '../components/Common/AppBar/AppBar';
import SideBar from '../components/SideBar/SideBar';
import TodoHeader from '../components/Todo/TodoHeader';
import TodoCreate from '../components/Todo/TodoCreate';
import TodoLists from '../components/Todo/TodoLists';

const data = [
  { id: nanoid(), task: 'Suspendisse potenti.', status: false, due_date: '2023-04-26' },
  {
    id: nanoid(),
    task: 'In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    status: false,
    due_date: '2023-05-08',
  },
  {
    id: nanoid(),
    task: 'Aenean fermentum. Donec ut mauris eget massa tempor convallis.',
    status: false,
    due_date: '2023-04-30',
  },
];

function App() {
  const [allTodos, setAllTodos] = useState(data);

  // add : CreateTodo
  const addTodo = function (taskName) {
    const newTodo = {
      id: nanoid(),
      task: taskName,
      status: false,
      due_date: dayjs().format('YYYY-MM-DD'),
    };
    setAllTodos((p) => [newTodo, ...p]);
  };

  // delete : DeleteTodo
  const deleteTodo = function (todoId) {
    setAllTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  };

  // edit : UpdateTodo
  const editTodo = function (todoId, updateTodoObj) {
    const newTodoLists = allTodos.reduce((acc, todo) => {
      if (todo.id !== todoId) acc.push(todo);
      else acc.push({ ...todo, ...updateTodoObj });
      return acc;
    }, []);
    setAllTodos(newTodoLists);
  };
  return (
    <div className='todo'>
      <div className='todo__header'>
        <AppBar />
      </div>
      <div className='todo__sidebar'>
        <SideBar />
      </div>
      <div className='todo__content'>
        <main className='todo__container'>
          <TodoHeader />
          <TodoCreate addTodo={addTodo} />
          <TodoLists data={allTodos} deleteTodo={deleteTodo} editTodo={editTodo} />
        </main>
      </div>
    </div>
  );
}

export default App;
