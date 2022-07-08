import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth'
import Projects from '../projects/Projects';
import Jumbotron from '../../components/jumbotron/Jumbotron';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
const ProjectView = () => {

  const title = "Projects";
  return (
    <div>
    {Auth.loggedIn() ? (
      <Box sx={{ display: 'flex', flexGrow: 1, flexwrap: 'nowrap'}}>
      <Sidebar />
    
          <Jumbotron title={title} />
      
      <Grid container spacing={0}
        sx={{
          mt: 8
        }}
      >
        <Grid item xs={12}>
            <Projects />
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

export default ProjectView