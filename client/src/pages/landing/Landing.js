import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Grid } from '@mui/material'
import landingPicture from '../../assets/images/bugtrackerpicture.png';
import glass from '../../assets/images/magnifyingIcon.png'
import './landing.scss';
import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';

const Landing = () => {

    const goToSignUpPage = () => {
        window.location.assign('/signup')
    }


  return (
    <Box className='content'
        sx={{
            display: 'flex',
            alignItems: 'center',
            width: 1,
        }}
    >

    <Grid container spacing={2}
        sx={{
            display: 'flex',
            justifyContent: 'center', 
            width: '50%',
            padding: 5
        }}
    >

        <Grid item 
            xs={10}
            className="grid"
             sx={{
            display: 'flex',
            justifyContent: 'center'
        
            
        }}
            ><FontAwesomeIcon icon={faBug} className="bug-icon" color="white" /></Grid>


        <Grid item
          sx={{
            textAlign: 'center',
            color: 'white'
          }}
        >
            <h1>BugTracker</h1>
            <p>Project Management tool to help in the software development industry.</p>
            <p>Keep tickets and projects managed and organized with your company today!</p>
        </Grid>

          <Grid item 
             sx={{
            textAlign: 'center',
            color: 'white'
          }}>

          </Grid>
     
            <Grid item xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Button onClick={goToSignUpPage} color="secondary" variant='contained'>Get Started</Button>
            </Grid>
            </Grid>

            <Box className="img-box"
               
            ><img src={landingPicture}/></Box>
    </Box>
  )
}

export default Landing;