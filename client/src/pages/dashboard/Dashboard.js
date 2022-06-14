import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth'

const Dashboard = () => {
  return (
    <div>
    {Auth.loggedIn() ? (
      <>
      <Navbar />
      <Sidebar />
      </>
    ) : (
      <Link to="/login">You are not logged in.</Link>
    )
    }
    
    </div>
  )
}

export default Dashboard