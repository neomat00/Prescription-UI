import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrescriptionList from './PrescriptionList';
import PrescriptionEdit from './PrescriptionEdit';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact={true} element={<PrescriptionList/>}/>
        <Route path='/:id' element={<PrescriptionEdit/>}/>
      </Routes>
    </Router>
  )
}

export default App;