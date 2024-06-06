import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  return (
    <div className='container'>
      <div className="header">
        <div className="text">Signup</div>
        <div className="underline"></div>
        <div className="inputs">
          <div className="input">
            <input type="text" placeholder="Name" />
          </div>
          <div className="input">
            <input type="email" placeholder="Email" />
          </div>
          <div className="input">
            <input type="password" placeholder="Password" />
          </div>
        </div>
        <div className="submit-container">
          <button className="submit">Signup</button>
          <Link to="/login" className="submit gray">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
