import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../utils/mutations';
import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faUserGear, faUserAstronaut, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import Dashboard from '../dashboard/Dashboard';
import './signup.scss';
const Signup = () => {
    const [role, setRole] = useState('');
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
      });
      const [createUser, { error, data }] = useMutation(CREATE_USER);
      // update state based on form input changes
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };

    
      const chooseRole = async (event) => {
     
        const putRole = event.target.id;
        console.log(event.target.id)
        setRole(putRole)
        console.log(role)
      }
  
        // submit form
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);
      try {
        const { data } = await createUser({
          variables: {
            role,
            ...formState },
        });
        console.log(data);
        Auth.login(data.createUser.token, data.addUser.user.username);
      } catch (e) {
        console.error(e);
      }
  
    };

    // const alertSignedUp = (newUser) => {
    //   alert('Welcome ' + newUser)
    // }
  
    return (
      <div className='first-container'>

<Box className="first-box"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.paper',
        overflow: 'hidden',
        fontWeight: 'bold',
        width: 600,
        height: 600
      }}
    >
              {data ? (
             
               <p>Welcome user {data.createUser.user.username}!</p>

              
              ) : (
                <form onSubmit={handleFormSubmit} className="signup-form">
                <FontAwesomeIcon icon={faBug} />
                <div className='signup-form-title'>Create an account</div>
                

                <TextField
                      
                      id="standard-basic" label="email" variant="standard"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      sx={{
                        width: '70%',
                        m: 1
                        }}
          
                    />

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
                     

                  <div className="role">
                  {/* <input
                    className="form-input"
                    // placeholder="Your username"
                    name="role"
                    type="text"
                    value={formState.role}
                    onChange={handleChange}
                    required
                  /><label>Role</label> */}
                  <div className="role-label"><label>Choose A Role</label></div>
                  <div className="icons">
                    <div className={`${role === 'admin' ? "icon-div active-div" : "icon-div"}`} id="admin" onClick={chooseRole}><FontAwesomeIcon icon={faUserAstronaut} className="fa-2xl icon"/>Admin</div>
                    <div className={`${role === 'project_manager' ? "icon-div active-div" : "icon-div"}`} id="project_manager" onClick={chooseRole}><FontAwesomeIcon icon={faUserDoctor} className="fa-2xl icon"/>Project Manager</div>
                    <div className={`${role === 'developer' ? "icon-div active-div" : "icon-div"}`} id="developer" onClick={chooseRole}><FontAwesomeIcon icon={faUserGear} className="fa-2xl icon"/>Developer</div>
                  </div>
                  </div>
                  

                  {error && (
                    <div className="signup-error">
                      {error.message}
                    </div>
                  )}
                  <Button 
                   type="submit" 
                   variant="contained" 
                   color="success"
                   sx={{
                    width: '70%',
                    m: 2,
                   }}
                   >Create Account
                   </Button>
                
                 
                  <p className="sign-up-link">
                  Already have an account? <Link to="/login">Login instead</Link>
                    </p>
                </form>
              )}

              </Box>
              </div>
    );
}

export default Signup