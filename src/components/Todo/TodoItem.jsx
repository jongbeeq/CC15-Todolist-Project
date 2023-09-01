import { FaTrashAlt, FaPen } from 'react-icons/fa';
import { HiOutlineCheck } from 'react-icons/hi';
import { useState } from 'react';
import styles from "./TodoItem.module.scss"
import TodoForm from './TodoForm';

// function TodoItem(props) {
// Object Destructure
// const { task, done, date } = props;
function TodoItem(props) {
    const [isOpenForm, setIsOpenForm] = useState(false)
    const handleClick = function () {
        setIsOpenForm(!isOpenForm);
    };

    const handleDelete = function () {
        props.deleteTodo(props.id)
    }

    return (
        <>{isOpenForm ? (
            <TodoForm textSubmit='Edit' setIsOpenForm={setIsOpenForm} editTodo={props.editTodo} />
        ) : (
            <li className={styles.todo}>
                <div className={`${styles.todo__checkbox} ${props.done ? styles.todo__checkbox__done : ''}`} >
                    <HiOutlineCheck className={styles.todo__checkbox__icon} />
                </div>
                <p className={`${styles.todo__task} ${props.done ? styles.todo__task__done : ""}`}>{props.task}</p>
                <span className={styles.todo__date}>{props.date}</span>
                <div className={styles.todo__action}>
                    <span>
                        <FaPen className={styles.todo__edit} onClick={handleClick} />
                    </span>
                    <span>
                        <FaTrashAlt className={styles.todo__delete} onClick={handleDelete} />
                    </span>
                </div>
            </li>)}
        </>
    )
};

export default TodoItem;