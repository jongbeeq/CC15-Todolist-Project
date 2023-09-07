// Dependencies
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import './App.scss';
import AppBar from '../components/Common/AppBar/AppBar';
import SideBar from '../components/SideBar/SideBar';
import TodoHeader from '../components/Todo/TodoHeader';
import TodoCreate from '../components/Todo/TodoCreate';
import TodoLists from '../components/Todo/TodoLists';

// const data = [
//   { id: nanoid(), task: 'Suspendisse potenti.', status: false, due_date: '2023-04-26' },
//   {
//     id: nanoid(),
//     task: 'In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
//     status: false,
//     due_date: '2023-05-08',
//   },
//   {
//     id: nanoid(),
//     task: 'Aenean fermentum. Donec ut mauris eget massa tempor convallis.',
//     status: false,
//     due_date: '2023-04-30',
//   },
// ];

const END_POINT = "http://localhost:8080/api/todos"

function App() {
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    //fetchAllTodo
    async function fetchAllTodo() {
      try {
        let response = await fetch("http://localhost:8080/api/todos", { method: "GET" });
        let todoData = await response.json();

        const newTodoLists = todoData.todos.map((todo) => {
          const newTodo = { ...todo, due_date: todo.date };
          delete todo.date;
          return newTodo;
        })

        setAllTodos(newTodoLists);
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllTodo();
  }, [])

  // add : CreateTodo
  const addTodo = async function (taskName) {
    const newTodo = {
      task: taskName,
      status: false,
      due_date: dayjs().format('YYYY-MM-DD'),
    };

    try {
      // SEND REQUEST : POST
      // WAIT RESPONSE
      const option = {
        method: "POST", headers: {
          'Content-type': 'application/json'
        }, body: JSON.stringify(newTodo)
      }
      let response = await fetch(END_POINT, option)
      let data = await response.json();
      const createdTodo = { ...data.todo, due_date: data.todo.date }
      delete createdTodo.date;
      // Update STATE
      setAllTodos((p) => [createdTodo, ...p]);
    } catch (error) {
      console.log(error)
    }

  };

  // delete : DeleteTodo
  const deleteTodo = async function (todoId) {
    try {
      const options = { method: "DELETE" }
      let response = await fetch(`${END_POINT}/${todoId}`, options);
      if (response.status === 204) {
        setAllTodos((prev) => prev.filter((todo) => todo.id !== todoId));
      }
    } catch (error) {
      console.log(error)
    }
  };

  // edit : UpdateTodo
  const editTodo = async function (todoId, updateTodoObj) {
    console.log(updateTodoObj)

    try {
      // FindTodo
      let foundedIndex = allTodos.findIndex((todo) => todo.id === todoId)
      if (foundedIndex !== -1) {
        // updateTodo
        const updatedTodo = { ...allTodos[foundedIndex], ...updateTodoObj };
        updatedTodo.date = updatedTodo.due_date;
        const options = {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(updatedTodo),
        }
        const response = await fetch(`${END_POINT}/${todoId}`, options);
        const data = await response.json();
        console.log(data.todo);

        // UpdateState
        const newTodoLists = [...allTodos];
        newTodoLists[foundedIndex] = { ...data.todo, due_date: data.todo.date };
        setAllTodos(newTodoLists);
      }
    } catch (error) {
      console.log(error)
    }
    // const newTodoLists = allTodos.reduce((acc, todo) => {
    //   if (todo.id !== todoId) acc.push(todo);
    //   else acc.push({ ...todo, ...updateTodoObj });
    //   return acc;
    // }, []);
    // setAllTodos(newTodoLists);
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
