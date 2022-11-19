import React from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import LoginView from './pages/LoginView';
import AppView from './pages/AppView'


import './App.css';
import Callback from './pages/Callback';

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/*" element={<AppView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/callback" element={<Callback />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
