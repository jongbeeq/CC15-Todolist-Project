import './Listitem.scss';
import { FaInbox, FaCalendar, FaCalendarAlt, FaChevronDown } from 'react-icons/fa';

function ListItem(prop) {
    console.log(prop)
    return (
        <li className='list__item'>
              {prop.icon}
              <p className='list__item__text'>{prop.text}</p>
        </li>
    );
}

export default ListItem