
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ENavbar from './Components/Navbar/Navbar';
import Sidenav from './Components/Sidenav/Sidenav';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';

function App() {
  return (
    <Router>
    <div className="App">
        <ENavbar />
        <Sidenav />
        <Routes>
        <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
