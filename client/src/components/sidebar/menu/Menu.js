import React from 'react';
import './menu.scss';
import Button from '@mui/material/Button'
import Auth from '../../../utils/auth';

const Menu = () => {

  const params = window.location.href;
    const paramArray = params.split('/');
    console.log(paramArray);



  return (
    <>
    <div className="menu">
        <ul>
            <li className={paramArray.length === 4 ? "active" : ""}>
                <a href={`/${paramArray[3]}`}>Dashboard</a>
            </li>
            <li className={paramArray[4] === "tickets" ? "active" : ""}>
                <a href={`/${paramArray[3]}/tickets`}>Tickets</a>
            </li>
            <li className={paramArray[4] === "users" ? "active" : ""}>
              <a href={`/${paramArray[3]}/users`}>Admin</a>
            </li>
           
        </ul>

    </div>

    <div className="logout-btn">
    <Button onClick={() => {Auth.logout(); {window.location.href="/login"}}} variant="contained" color="secondary">Logout</Button>
    </div>
    </>
  )
}

export default Menu