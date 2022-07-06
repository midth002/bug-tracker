import React from 'react';
import './menu.scss';

const Menu = () => {

  const params = window.location.href;
    const paramArray = params.split('/');
    console.log(paramArray);

  return (
    <div className="menu">
        <ul>
            <li>
                <a href={`/${paramArray[3]}`}>Dashboard</a>
            </li>
            <li>
              <a href={`/${paramArray[3]}/users`}>User Roles</a>
            </li>
            <li>
                <a href={`/${paramArray[3]}/projects`}>Projects</a>
            </li>
            <li>
                <a href={`/${paramArray[3]}/tickets`}>Tickets</a>
            </li>
            <li>
               <a href={`/${paramArray[3]}/myprojects`}>My Projects</a>
            </li>
        </ul>
    </div>
  )
}

export default Menu