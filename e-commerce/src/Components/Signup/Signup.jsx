import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
// import emailIcon from '../Assests/email.png';
// import passwordIcon from '../Assests/password.png';
// import personIcon from '../Assests/person.png';

const Signup = () => {
  return (
    <div className='background-image'>
   
      <div className='card' style={{padding : 0,marginRight:'40%' }}>
        <div className="header_Signup">
          <h2>Signup</h2>
        </div>
        <div className="body">
          <div className="input">
          {/* <img src={personIcon} alt="Person Icon" /> */}
         
            <input type="text" placeholder="Name" />
          </div>
          <div className="input">
  {/* <img src={emailIcon} alt="Email Icon" /> */}
  <input type="email" placeholder="Email" />
</div>

          <div className="input">
          {/* <img src={passwordIcon} alt="Password Icon" /> */}
            <input type="password" placeholder="Password" />
          </div>
          <div className="submit-container">
            <button className="submit">Signup</button>
          
          </div>
          <div className="login-link">
            <span>Already have an account? </span>
            <Link to="/login" className="login">Login</Link>
          </div>
        </div>
      </div>
    </div>
    
  );
};



export default Signup;
