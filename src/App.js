import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import EventPage from './Pages/EventPage'; // Your event page component
import HomePage from './Pages/HomePage'; // Your home page component
import EventSearchPage from './Pages/EventSearchPage';
import { AuthProvider } from "./Contexts/AuthProvider";
import "./Pages/Spinner.css"
import LoginSignupPage from './Pages/LoginSignupPage';

function App() {
  const navigate = useNavigate();
  return (
    <AuthProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:token" element={<EventPage />} />
        <Route path="/Discover" element={<EventSearchPage />} />
        <Route path="/LoginSignup" element={<LoginSignupPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
