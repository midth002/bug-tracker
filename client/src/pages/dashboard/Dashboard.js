import React from 'react';
import Jumbotron from '../../components/jumbotron/Jumbotron';
import Sidebar from '../../components/sidebar/Sidebar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import Chart from '../../components/chart/Chart';
import Projects from '../projects/Projects';

const Dashboard = () => {
    const title = 'DASHBOARD'
  return (
    <div>
    {Auth.loggedIn() ? (
      <Box sx={{ display: 'flex', flexGrow: 1, flexwrap: 'wrap', justifyContent: 'center', align: 'center'}}>
      <Sidebar />

      
    
          <Jumbotron title={title} />

          
      <Grid container spacing={0}
        sx={{
          mt: 7,
          ml: 14,
          flexGrow: 1
        }}
      >

          <Grid item xs={12} align='center'>
            <Projects />
        </Grid>
   

       

        <Grid item xs={12} align='center' justify='center' alignItems='center' >
           <Chart />
           </Grid>
        </Grid>
      </Box>
    ) : (
      <Link to="/login">You are not logged in.</Link>
    )
    }
    
    </div>
  )
}

export default Dashboard