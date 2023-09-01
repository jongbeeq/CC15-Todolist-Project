import { useState } from 'react';
import TodoForm from './TodoForm';
import styles from './TodoLists.module.scss';
import TodoItem from './TodoItem';

/*
data = Array<{id:number, task:string, status:boolean , due_date:string}>
*/

function TodoLists({ data }) {
  // CRUD =Create-Read-Update-Delete

  const [isOpenForm, setIsOpenForm] = useState(true)

  // #2 : JS Function (Logic)
  const handleClick = function () {
    setIsOpenForm(!isOpenForm);
  };

  return (
    <ul className={styles.todo__lists}>
      {data.map(({ id, task, status, due_date }) => (
        <TodoItem
          key={id}
          task={task}
          done={status}
          date={due_date}
        />)
      )}
    </ul >
  );
}

export default TodoLists;
