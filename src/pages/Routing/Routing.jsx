import React from 'react';
import { Route, BrowserRouter as Router, Routes, } from 'react-router-dom';
import Home from '../Home/Home';
import FallbackRoute from './Fallback';
import Register from '../../components/Register/Register';
import Login from '../../components/Login/Login';
import VerifyOtp from '../../components/Register/VerifyOtp';
import Navbar from '../../components/Navbar/Navbar';
import About from '../About/About';
import Features from '../Features/Features';
import Contact from '../Contact/Contact';

const Routing = () => {
  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/features' element={<Features/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='*' element={<FallbackRoute/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/verify-otp' element={<VerifyOtp/>}/>
            
        </Routes>
    </Router>
    </>
  )
}

export default Routing
