import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import CustomerDashboard from './components/Customer/CustomerDashboard';
import HotelDashboard from './components/Hotel/HotelDashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

export const UserContext = createContext();

function App() {

  const [user, setUser] = useState({
    loggedIn: false,
    userDetails: null,
  });

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <div>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/customer/dashboard" element={user.loggedIn ? <CustomerDashboard /> : <Navigate to="/login" />} />
            <Route path="/hotel/dashboard" element={user.loggedIn ? <HotelDashboard /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
