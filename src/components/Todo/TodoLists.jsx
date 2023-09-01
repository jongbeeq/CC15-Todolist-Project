import TodoItem from './TodoItem';
import styles from './TodoLists.module.scss';

/*
SCHEMA
todoObj={id:number, task:string, status:boolean, due_date:string}

data = Array[] {id:number, task:string, status:boolean, due_date:string}
หรือ data = Array[] todoObj

dataRender = Array[] <TodoItem task=... done=... date=.... /> 
*/

function TodoLists(props) {
  return (
    <ul className={styles.todo__lists}>
      {props.data.map((todoObj) => (
        <TodoItem
          key={todoObj.id}
          id={todoObj.id}
          task={todoObj.task}
          done={todoObj.status}
          date={todoObj.due_date}
          deleteTodo={props.deleteTodo}
          editTodo={props.editTodo}
        />
      ))}
    </ul>
  );
}

export default TodoLists;
