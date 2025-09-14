import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PropertyProvider } from './contexts/PropertyContext';
import Header from './components/Header';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </Router>
      </PropertyProvider>
    </AuthProvider>
  );
}

export default App;