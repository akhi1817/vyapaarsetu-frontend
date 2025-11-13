import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
// Public Pages
import Home from '../Home/Home';
import About from '../About/About';
import Features from '../Features/Features';
import Contact from '../Contact/Contact';
import FallbackRoute from './Fallback';
import Register from '../../components/Register/Register';
import VerifyOtp from '../../components/Register/VerifyOtp';
import Login from '../../components/Login/Login';
import AdminDashboard from '../Admin/AdminDashboard';




const Routing = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<FallbackRoute />} />
        <Route path='/send-otp' element={<Register/>}/>
        <Route path='/verify-otp' element={<VerifyOtp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      </Routes>
    </Router>
  );
};

export default Routing;
