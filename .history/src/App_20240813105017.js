import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Breakfast from './Breakfast';
import Lunch from './Lunch';
import Dinner from './Dinner';
import SpecialDiet from './SpecialDiet';
import Log from './Log';
import Signup from './Sign';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/breakfast" element={<Breakfast />} />
        <Route path="/lunch" element={<Lunch />} />
        <Route path="/dinner" element={<Dinner />} />
        <Route path="/special-diet" element={<SpecialDiet />} />
        <Route path="/login" element={<Log />} />
        <Route path="/signup" element={<Sign />} />
      </Routes>
    </Router>
  );
}

export default App;
