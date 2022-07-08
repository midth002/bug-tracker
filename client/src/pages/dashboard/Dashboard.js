import React from 'react';
import Jumbotron from '../../components/jumbotron/Jumbotron';
import Sidebar from '../../components/sidebar/Sidebar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import Chart from '../../components/chart/Chart'

const Dashboard = () => {
    const title = 'dashboard'
  return (
    <div>
    {Auth.loggedIn() ? (
      <Box sx={{ display: 'flex', flexGrow: 1, flexwrap: 'nowrap'}}>
      <Sidebar />
    
          <Jumbotron title={title} />
           <Chart />
      </Box>
    ) : (
      <Link to="/login">You are not logged in.</Link>
    )
    }
    
    </div>
  )
}

export default Dashboard