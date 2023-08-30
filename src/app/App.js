import "./App.scss";
import Header from "../components/Header";
import "../components/Header.scss";
import "../index.scss";
import {
  FaInbox,
  FaCalendar,
  FaCalendarAlt,
  FaChevronDown,
} from "react-icons/fa";
import Lists from "../components/Lists";
import TodoHeader from "../components/Todo/TodoHeader";
import TodoCreate from "../components/Todo/TodoCreate";
import TodoLists from "../components/Todo/TodoLists";

function App() {
  const generalLists = [
    { id: 1, text: "Inbox", icon: <FaInbox />, active: true },
    { id: 2, text: "Today", icon: <FaCalendar />, active: false },
    { id: 3, text: "Next 7 Days", icon: <FaCalendarAlt />, active: false },
  ];

  const projectLists = [
    { id: 1, text: "Project-A", icon: <FaInbox />, active: true },
    { id: 2, text: "Project-B", icon: <FaInbox />, active: false },
  ];

  return (
    <div className="todo">
      <div className="todo__header">
        <Header />
      </div>
      <div className="todo__sidebar">
        <aside className="sidebar">
          <section className="sidebar_category">
            <Lists data={generalLists} />
          </section>
          <section className="sidebar_category">
            <div className="accordian"></div>
            <div className="accordian__toggle">
              <li className="accordian__item">
                <FaChevronDown className="accordian__item__icon accordian__item__active" />
                <p className="accordian__item__text">Projects</p>
              </li>
            </div>
            <Lists data={projectLists} />
          </section>
        </aside>
      </div>
      <div className="todo__content">
        <main className="todo__container">
          <TodoHeader />
          <TodoCreate />
          <TodoLists />
        </main>
      </div>
    </div>
  );
}

export default App;

/* Challenge
- ให้ 2 section render UI ที่...
  - Option A (2/5): render UI ต่างกัน <List/> กับ <Accordian/> : Difficult 2.5
  - Option B (4/5): render UI เดียวกัน เช่น <Lists/>
  - Option C (5/5): render UI <Lists/> ภายใต้ <Accordian> <Lists/> <Accordian>
  // ใช้ props.children
*/
