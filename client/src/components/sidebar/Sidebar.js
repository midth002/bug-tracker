import React from 'react';
import Menu from './menu/Menu';
import './sidebar.scss';
import Auth from '../../utils/auth';
import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {

  const userName = Auth.getUsername();

  return (
    <div className='sidebar'>
    <div><h4>BugTracker <span><FontAwesomeIcon icon={faBug} /></span></h4></div>
    <h5>{userName}</h5>
    <Menu />
    </div>
  )
}

export default Sidebar