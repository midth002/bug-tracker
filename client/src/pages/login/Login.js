import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './login.scss';
import Auth from '../../utils/auth';
import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [formState, setFormState] = useState({ 
      username: '', 
      password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);
    // update state based on form input changes
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };

  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      
      Auth.login(data.login.token, data.login.user.username);
    } catch (e) {
      console.error(e);
    }

  
     setFormState({
        username: '',
        password: '',
      });
    };
    return (
      <div className='first-container'>
       
      <Box className="first-box"
      sx={{
        mt: 7,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        // bgcolor: 'background.paper',
        overflow: 'hidden',
        fontWeight: 'bold',
        width: 600,
        height: 500
      }}
    >
    
                {data ? (
                 
                   <p>Success</p>
                
                  
                ) : (
                 
                 
                  <form onSubmit={handleFormSubmit} className="login-form">
                  <FontAwesomeIcon icon={faBug}  />
                  <div className='login-form-title p-b-26 text-primary'>Login to BugTracker</div>
                 
                 
                    <TextField
                      id="standard-basic" label="username" variant="standard"
                      name="username"
                      type="text"
                      value={formState.username}
                      onChange={handleChange}
                      sx={{
                        width: '70%',
                        m: 1
                        }}
                     
                    />
                    
                    <TextField
                      className="form-input"
                      id="standard-basic" label="password" variant="standard"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                      sx={{
                        width: '70%',
                        m: 1
                        }}
          
                    />
                 
                      {error && (
                  <div className="login-error">
                    {error.message}
                  </div>
                )}
                   
                   <Button 
                   type="submit" 
                   variant="contained" 
                   color="secondary"
                   sx={{
                    width: '70%',
                    m: 2,
                   }}
                   >Login
                   </Button>
                
                  
                  <div>
                  <p className="sign-up-link">Don't have an account? <Link to="/signup">Signup instead</Link></p>
                  </div>
                  </form>
                  
                )}
              
                </Box>
                </div>
      );
    };
    export default Login;