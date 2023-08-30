import './Listitem.scss';

/*
prop = {
    text: string
    icon: <Component/>
    active: boolean
}
*/


function ListItem(prop) {
    console.log(prop)

    const listClassName = `list__item ${prop.active ? "active" : ""}`;
    // active=false => textClassName = 'list__item'
    // active=true => textClassName = 'list__item active'

    return (
        <li className={listClassName}>
              {prop.icon}
              <p className='list__item__text'>{prop.text}</p>
        </li>
    );
}
// CSS + JS Value == DynamicClassName

// not-active : className='list__item__text'
// active : className='list__item__text active'

export default ListItem