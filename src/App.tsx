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
import { SearchProvider } from './context/SearchContext';

const App: React.FC = () => {
  console.log("diego");
  return (
      <SearchProvider>
      <AdminProvider>
      <div className="page-container">
        <Navbar />
        <div className="content-wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/upload" element={<UploadProduct />} />
        </Routes>
        </div>
        <Footer />
      </div>
      </AdminProvider>
      </SearchProvider>
   
  );
};

export default App;
