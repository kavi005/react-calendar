import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Navbar from './NavBar/NavBar';
import { Schedule } from './pages/Schedule/Schedule';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} /> } />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </BrowserRouter>
      
    </div>
    
  );
}

export default App;
