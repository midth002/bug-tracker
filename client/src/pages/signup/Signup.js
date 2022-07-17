import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useMutation } from '@apollo/client';
import { CREATE_USER, LOGIN_USER } from '../../utils/mutations';
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
        firstName: '',
        lastName: ''
      });
      const [createUser, { error, data }] = useMutation(CREATE_USER);
      const [ login, {data:loginData}] = useMutation(LOGIN_USER);
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
        const mutationResponse= await createUser({
          variables: {
            role,
            ...formState },
        });
        console.log(mutationResponse.data.createUser.token);
        // Auth.login(data.createUser.token, data.addUser.user.username);
      } catch (e) {
        console.error(e);
      }

      try {
        console.log(formState.email, formState.password, formState.username)
          const { data: loginData } = await login({
            variables: {
              username: formState.username,
              password: formState.password,
            }
          })

          Auth.login(loginData.login.token, formState.username )
      } catch (err) {
        console.log(err)
      }
  
    };

    return (
      <div className='first-container'>

<Box className="first-box"
      sx={{
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontWeight: 'bold',
        width: 600,
        height: 600
      }}
    >
      

              {data ? (
             
               <p>Welcome {data.createUser.user.firstName}!</p>

              
              ) : (
                




                <form onSubmit={handleFormSubmit} className="signup-form">
                <FontAwesomeIcon icon={faBug} />
                <div className='signup-form-title'>Signup To BugTracker</div>

                 
                <TextField
                      id="standard-basic" label="First Name" variant="standard"
                      name="firstName"
                      type="text"
                      value={formState.firstName}
                      onChange={handleChange}
                      sx={{
                        width: '38%',
                        m: 1,
                        color: "secondary"
                        }}
                     
                    />

                  <TextField
                      id="standard-basic" label="Last Name" variant="standard"
                      name="lastName"
                      type="text"
                      value={formState.lastName}
                      onChange={handleChange}
                      sx={{
                        width: '38%',
                        m: 1,
                        color: "secondary"
                        }}
                     
                    />

                
                
                <TextField
                      id="standard-basic" label="username" variant="standard"
                      name="username"
                      type="text"
                      value={formState.username}
                      onChange={handleChange}
                      sx={{
                        width: '80%',
                        m: 1
                        }}
                     
                    />

                <TextField
                      
                      id="standard-basic" label="email" variant="standard"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      sx={{
                        width: '80%',
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
                        width: '80%',
                        m: 1
                        }}
          
                    />
                     

                  <div className="role">
               
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
                   color="secondary"
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