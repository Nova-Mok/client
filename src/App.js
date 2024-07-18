import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Login from './pages/login';
import SearchComponent from './pages/main';
import Onboarding from './pages/onboarding';

function App() {
  const { email } = useParams();
  const aws_api_key = "AKIAIOSFODNN7EXAMPLE"; 
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<SearchComponent/>} />
        <Route path="/onboarding" element={<Onboarding/>} />
      </Routes>
    </Router>
  );
}

export default App;
