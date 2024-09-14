import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventPage from './Pages/EventPage'; // Your event page component
import HomePage from './Pages/HomePage'; // Your home page component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:token" element={<EventPage />} />
      </Routes>
    </Router>
  );
}

export default App;
