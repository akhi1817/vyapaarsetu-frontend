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

// Admin Pages
import ProtectedAdminRoute from '../Admin/ProtectedAdminRoute';
import AdminDashboard from '../Admin/AdminDashboard';
import CreateInvoice from '../AddInvoices/CreateInvoice';
import InvoiceList from '../AddInvoices/InvoiceList';
import EditInvoice from '../AddInvoices/EditInvoice';

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
        <Route path='/send-otp' element={<Register />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/login' element={<Login />} />

        {/* Admin Routes (Nested) */}
        <Route path="/admin-dashboard" element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }>
          {/* Nested Routes inside Dashboard */}
          <Route path="create-invoice" element={<CreateInvoice />} />
          <Route path="all-invoices" element={<InvoiceList />} />
          <Route path="edit-invoice/:id" element={<EditInvoice />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;
