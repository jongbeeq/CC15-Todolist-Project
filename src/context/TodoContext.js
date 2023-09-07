import { createContext } from "react";
import { useState, useEffect} from "react";
import dayjs from "dayjs";
// ชื่อ Context => ใช้ทั้ง Provider , Consumer
const TodoContext = createContext()
const END_POINT = "http://localhost:8080/api/todos"

// SetUp Context ฝั่ง Provider
function TodoContextProvider (props) {
    const [allTodos,setAllTodos] = useState([]);

    // #2 : Read
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
    
    useEffect(()=>{
        fetchAllTodo();
    },[])

     // #1 : Create
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

    // #3 : update
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
        return { value: 5, allTodos, setAllTodos, fetchAllTodo};
    }

    // #4 : Delete
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

    const sharedObj = {value: 60, allTodos ,addTodo ,fetchAllTodo,editTodo,deleteTodo};
    return <TodoContext.Provider value={sharedObj}>{props.children}</TodoContext.Provider>
}

// export ไปครอบ UI
export default TodoContextProvider;

// export ไปให้ consumer
export { TodoContext };