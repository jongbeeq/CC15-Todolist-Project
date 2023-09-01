import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Button } from '../Common/Button/Button';
import styles from './TodoForm.module.scss';

/*
props = {
  textSubmit : string
  setIsOpenForm : FN
}
*/

/*
CC1 - Form Handle

-ใช้ FN ไปผูกกับ Event ชื่อ onSubmit
-FN จะถูก Broswer เรียกใช้ (เมื่อไหร่?) โดยส่ง parameter มา 1 ตัว (event Object)
-โดย default ทุกปุ่มใน <form> จะทำหน้าที่ submit
-วิธีแก้ ต้องกำหนด type ของปุ่ม
  - type='submit'
  - type='button'
*/


function TodoForm(props) {
  const [isError, setIsError] = useState(false);
  const [taskInput, setTaskInput] = useState("");

  const handleChangeInput = function (event) {
    if (isError) setIsError(false);
    setTaskInput(event.target.value)
  }

  const handleSubmit = function (event) {
    // 1.PreventDefault
    event.preventDefault()

    // 2.ต้องรู้ก่อนว่า user พิมพ์อะไร (อยู่ใน satate : taskInput)

    // 3.FormValidation
    // case1 : submit ได้
    // case2 : submit ไม่ได้ => แสดง Error

    if (taskInput.trim() === '') {
      console.log("Error")
      setIsError(true);
      return;
    }

    console.log('submit === create New Todo');
    // create newTodo
    // 1 - ส่ง Request ไปหลังบ้านเพื่อ save ลง Database
    // 2 - ทำการอัพเดท State ของ AllTodo == React ทำการ Rerender
    // data = []
    // data = [{id:number,task:string,status:boolean,due_date:YYY-MM-DD}]
    // oldState = [{o},{o},{o}] === props.data
    // newState = [{n},{o},{o},{o}]

    // Send taskInput to addTodo
    props.addTodo(taskInput);

    props.setIsOpenForm(false);
  };

  const handleCancel = function () {
    console.log('cancel');
    // correctName : setIsOpenForm(false)
    // inCorrectName : undefine(false) => บู้มมมมม!!!
    props.setIsOpenForm(false);
  };

  const handleEdit = function () {
    props.editTodo('edit')
  }


  return (
    <form className={styles.todo__form__container} onSubmit={handleSubmit}>
      {/*	Body */}
      <input className={styles.todo__form__input} placeholder='Task Name' onChange={handleChangeInput} value={taskInput} />

      {/*Form Footer */}
      <div className={styles.todo__form__footer}>
        <p className={styles.todo__error}>{isError ? "Title is required" : ""}</p>
        <div className={styles.todo__form__buttons}>
          <Button text="Cancel" active={false} type='button' onClick={handleCancel} />
          <Button text={props.textSubmit} active={true} type='submit' />
        </div>
      </div>
    </form>)
}

export default TodoForm;
