import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import './login.scss';


import Auth from '../../utils/auth';

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
       <>
                {data ? (
                 
                   <p>Success</p>
                
                  
                ) : (
                  <form onSubmit={handleFormSubmit} className="login-form">
                  <span className='login-form-title p-b-26 text-primary'>Login</span>
                 
                  <div className="validate-input form-input-wrap">
                    <input
                      className="form-input rounded-left"
                      name="username"
                      type="text"
                      value={formState.username}
                      onChange={handleChange}
                      required
                    /><label>Username</label>
                    </div>
                    <div className="validate-input form-input-wrap">
                    <input
                      className="form-input"
                     
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                      required
                    /><label>Password</label>
                    </div>
                      {error && (
                  <div className="login-error">
                    {error.message}
                  </div>
                )}
                    <div className="login-btn-form">
                   <button>Login</button>
                    </div>
                  
                  <div>
                  <p className="sign-up-link">Don't have an account? <Link to="/signup">Signup instead</Link></p>
                  </div>
                  </form>
                  
                )}
              
                </>
      );
    };
    export default Login;