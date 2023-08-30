import styles from "./TodoHeader.module.scss";
// styles = { header : cssRule}

function TodoHeader () {
    const today = new Date()
    const option = {weekday: "short", day: "numeric", month: "short"}
    return (
        <div className={styles.header}>
            <h1 className={styles.header__text}>Inbox</h1>
            <span className={styles.header__date}>{today.toLocaleString('en-US',option)}</span>
        </div>
    );
}

export default TodoHeader;