import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Newcar from './Components/Newcar';
import EditCar from './Components/Editcar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<Newcar submit="Add Car" />} />
        <Route path='/edit/:id' element={<EditCar />} />
      </Routes>
    </Router>
  );
}

export default App;
