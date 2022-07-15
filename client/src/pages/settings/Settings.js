import React from 'react';
import Loading from '../../components/loading/Loading';
import Sidebar from '../../components/sidebar/Sidebar';
import Jumbotron from '../../components/jumbotron/Jumbotron';
import { Box, Button } from '@mui/material';
import { GET_USERNAME } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGear, faUserAstronaut, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import './settings.scss'

const Settings = () => {

    const userName = Auth.getUsername();

    const { loading: userDataLoading, data: userData, error} 
    = useQuery(GET_USERNAME, {
      variables: {
        username: userName
      }
    })
    
    if (userDataLoading) return <Loading />;
    if (!userData) return <p>Not Found</p>;

    console.log(userData);

    const title = "SETTINGS"

   

  return (
    <Box
    sx={{
        display: 'flex'
    }}
    >
        <Sidebar />
        <Jumbotron title={title}/>

        <Box 
        sx={{
          ml: 23, 
          mt: 10,
          padding: 5,
          justifyContent: 'center', 
          alignItems: 'center',
          borderRadius: 3,
          width: '25%'
          }}
        bgcolor="#fafbfc"
        >
            <Box>
              <label className="settings-label">{userData.getOneUserByUsername[0].username}</label>
            </Box>
            <Box sx={{mt:3}}>
              <label className="settings-label">Full Name</label>
            </Box>
            <Box 
              sx={{mt: 5}}
            >
              <label className="settings-label">Role</label>
              <div>{userData.getOneUserByUsername[0].role}</div>
            </Box>
            <Box
            sx={{mt: 5, display: 'block'}}
            >
            <label className="settings-label">Email</label>
              <div>{userData.getOneUserByUsername[0].email}</div>
              <Button color="secondary" variant="outlined" >Change Email</Button>
            </Box>

            <Box 
            sx={{
              mt:5,
              display: 'flex',
              justifyContent: 'space-between'
            
            }}

            >
              <Button color="secondary" variant="outlined" >Change Password</Button>
            </Box>

            <Box 
            sx={{mt: 5}}
            >
              <Button color="error" variant="contained">Deactivate Account</Button>
            </Box>
        </Box>
      
    </Box>
  )
}

export default Settings