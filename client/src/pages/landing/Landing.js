import React from 'react';
import { Link } from 'react-router-dom';
import landingPicture from '../../assets/images/bugtrackerpicture.png';
import './landing.scss';

const Landing = () => {
  return (
    <div className='content'>
        <nav>
            <div className="header">
                <h1>Bug Tracker</h1>
            </div>

            <div className="links">
                <Link to='/login' className="link login">Login</Link>
                <Link to='/signup' className="link signup">Signup</Link>
            </div>
        </nav>
        <div className='jumbotron'>
            <div className="img-div">
                <img src={landingPicture}/>
            </div>
        </div>
    </div>
  )
}

export default Landing;