import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import ProductDetails from './ProductDetails';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import UploadProduct from './UploadProducts';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AdminProvider } from './context/AdminContext';

const App: React.FC = () => {
  return (
    <AdminProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/upload" element={<UploadProduct />} />
        </Routes>
        <Footer />
      </div>
    </AdminProvider>
  );
};

export default App;
