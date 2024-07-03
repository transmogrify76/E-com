import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Import your CSS file for styling
//  import emailIcon from '../Assests/email.png';
// import passwordIcon from '../Assests/password.png';

const Login = () => {
 
  
  return (
    <div className='background-image'>
  
   
  
      <div className='card-login'style={{padding : 0,marginRight: '40%'}}>
        <div className="card-header-login" >
          <h2>Login</h2>
        </div>
        <div className="card-body-login">
        <div className="input">
            {/* { <img src={emailIcon} alt="Email Icon" /> } */}
            <input type="email" placeholder="Email" />
          </div>
          <div className="input">
            {/* <img src={passwordIcon} alt="Password Icon" /> */}
            <input type="password" placeholder="Password" />
          </div>
          <div className="submit-container">
            <button className="submit">Login</button>
           
          </div>
          <div className="forgot-password">
            <Link to="/forgetpassword">Forgot password? Click here</Link>
          </div>
          <div className="signup-link">
            <span>Don't have an account? </span>
            <Link to="/signup" className="signup">Signup</Link>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Login;
