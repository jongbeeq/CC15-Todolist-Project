import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiPlus } from 'react-icons/hi';
import styles from './TodoCreate.module.scss';
import TodoForm from './TodoForm';


/*
CC! - Condition Rendering
- Default : Show Button & Text
- Active : Show TodoForm

Concept : true ? <AddTask/> : <TodoForm/>
*/

/*
CC2 - EVENT HANDLING
- เอาฟังก์ชันไปผูกติดกับ UI เพื่อให้ USER เป็นคนเรียกใช้ฟังก์ชันเอง
- onClick : ต้อง Click ก่อน , FN ถึงจะรัน
  - USER จะทำการคลิก
  - BROSWER เรียกใช้ FN => Broswer กำหนด parameter ของ FN
   handleClick(eventObject)
*/

/*
CC3 - JS Value ไม่สามารถทำให้ React Render ได้
ต้องใช้ state
*/

/*
CC-4 Array Destructuring
function myUseState() {
  return [5,9]
}
let [a,b] = myUseState()
a === 5
b === 9
*/


/*
CC5 - React State (1 ในฟังก์ชันของกลุ่ม React Hook)
const [state,setState]= useState(initialState:any)
  // element 1: current State
  // element 2 : Fn สำหรับ SetState
  // เมื่อ state เปลี่ยน FC จะ Rerender
  // Rerender == Code ทั้งหมดใน FC จะถูกรันใหม่ 1 ครั้ง
*/

// #1 : FC = Function Component (Render)
function TodoCreate(props) {
  // HOOK FN
  const [isOpenForm, setIsOpenForm] = useState(false)

  // #2 : JS Function (Logic)
  const handleClick = function () {
    setIsOpenForm(!isOpenForm);
  };

  return (
    <>
      {isOpenForm ? (
        <TodoForm
          textSubmit='Add Task'
          setIsOpenForm={setIsOpenForm}
          addTodo={props.addTodo}
        />
      ) : (
        <div className={styles.todo__create} onClick={handleClick}>
          <div className={styles.todo__create__button}>
            <HiPlus />
          </div>
          <h3 className={styles.todo__create__text}>Add Task</h3>
        </div>
      )}
    </>
  );
}

export default TodoCreate;
