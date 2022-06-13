import React from 'react';
import './menu.scss';

const Menu = () => {
  return (
    <div className="menu">
        <ul>
            <li>
                <a href='/'>Dashboard</a>
            </li>
            <li>
              <a href='/userRoles'>User Roles</a>
            </li>
            <li>
                <a href='/projects'>Projects</a>
            </li>
            <li>
                <a href='/tickets'>Tickets</a>
            </li>
            <li>
               <a href='myProjects'>My Projects</a>
            </li>
        </ul>
    </div>
  )
}

export default Menu