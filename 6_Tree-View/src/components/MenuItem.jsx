import { useState } from "react"
import MenuList from "./MenuList"
import { NavLink } from 'react-router-dom';

function MenuItem({ item }) {
  const [displayCurrentChildren, setDisplayCurrentChildren] = useState({});

  function handleToggleChildren(getCurrentLabel) {
    setDisplayCurrentChildren({
      ...displayCurrentChildren,
      [getCurrentLabel]: !displayCurrentChildren[getCurrentLabel]
    })
  }
  return (
    <li className="menu-item">
      <div className="menu-row">
        <NavLink
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) => `menu-link ${isActive ? 'is-active' : ''}`}
        >
          {item.label}
        </NavLink>
        {
          item && item.children && item.children.length > 0 ? (
            <button
              type="button"
              className={`toggle-button ${displayCurrentChildren[item.label] ? "is-open" : ""}`}
              onClick={() => handleToggleChildren(item.label)}
              aria-label={`Toggle ${item.label}`}
              aria-expanded={Boolean(displayCurrentChildren[item.label])}
            >
              <span>+</span>
            </button>
          ) : null 
        } 
      </div>

      {
        item && item.children && item.children.length > 0 && displayCurrentChildren[item.label] ? (
          <MenuList list={item.children}/>
        ) : null
      }
    </li>
  )
}

export default MenuItem
