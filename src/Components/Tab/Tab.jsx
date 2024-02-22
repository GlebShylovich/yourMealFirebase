import './tab.scss'
import { NavLink } from 'react-router-dom'

export default function Tab({item}) {
  return (
    <NavLink to={item.path} className="tab">
      <img className="tab__image " src={item.image} alt="image" />
      <div className="tab__title">{item.name}</div>
    </NavLink>
  )
}