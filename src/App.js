import { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Navbar from './NavBar/NavBar';
import { Schedule } from './pages/Schedule/Schedule';

export const UserSessionContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);  

  return (
    <div>
      <UserSessionContext.Provider value={loggedIn}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} /> } />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </BrowserRouter> 
      </UserSessionContext.Provider>     
    </div>    
  );
}

export default App;
