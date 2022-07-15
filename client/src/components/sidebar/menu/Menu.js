import React from 'react';
import './menu.scss';
import Button from '@mui/material/Button'
import Auth from '../../../utils/auth';

const Menu = () => {

  const params = window.location.href;
    const paramArray = params.split('/');
  

  

  return (
    <>
    <div className="menu">
        <ul>
            <li className={paramArray[3] === "dashboard" ? "active" : ""}>
                <a href={`/dashboard`}>Dashboard</a>
            </li>
            <li className={paramArray[3] === "tickets" ? "active" : ""}>
                <a href={`/tickets`}>Tickets</a>
            </li>
            <li className={paramArray[3] === "settings" ? "active" : ""}>
              <a href={`/settings`}>Settings</a>
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