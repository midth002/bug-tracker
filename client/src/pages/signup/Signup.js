import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
// import Dashboard from '../dashboard/Dashboard';

const Signup = () => {
    const [formState, setFormState] = useState({
        userName: '',
        email: '',
        password: '',
        role: '',
      });
      const [addUser, { error, data }] = useMutation(ADD_USER);
      // update state based on form input changes
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };
  
        // submit form
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);
      try {
        const { data } = await addUser({
          variables: { ...formState },
        });
        console.log(data);
        Auth.login(data.addUser.token);
      } catch (e) {
        console.error(e);
      }
  
    };
  
    return (
      <main className="justify-center mb-4 container signup">
            <div className="flex-row content card justify-center col-md6 col-lg-5 wrap-signup">
                <div className="card-body">
              {data ? (
                <p>
                 {/* <Dashboard /> */}
                 You have signed up!
                </p>
              ) : (
                <form onSubmit={handleFormSubmit} className="signup-form">
                <span className='signup-form-title p-b-0 text-primary'>Create an account</span>
                <div className="validate-input form-input-wrap">
                  <input
                    className="form-input"
                    // placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.userName}
                    onChange={handleChange}
                    required
                  /><label>Username</label>
                  
                  </div>
                  <div className="validate-input form-input-wrap">
                  <input
                    className="form-input"
                    name="email"
                    type="text"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  /><label>Email</label></div>
                  <div className="validate-input form-input-wrap">
                  <input
                    className="form-input"
                    // placeholder="Your username"
                    name="role"
                    type="text"
                    value={formState.userName}
                    onChange={handleChange}
                    required
                  /><label>Role</label>
                  
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
                    <div className="signup-error">
                      {error.message}
                    </div>
                  )}
                  <button>Create Account</button> 
                 
                  <p className="sign-up-link">
                  Already have an account? <Link to="/login">Login instead</Link>
                    </p>
                </form>
              )}
            </div>
          </div>
      </main>
    );
}

export default Signup