import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { LanguageProvider, useLanguage } from './LanguageContext';
import Home from './pages/Home';
import ResourceDetail from './pages/ResourceDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import SESMagInfo from './pages/SESMagInfo';
import Bookmarks from './pages/Bookmarks';

function AppContent() {
  const { largeText } = useLanguage();

  return (
    <div style={{ fontSize: largeText ? '1.2rem' : '1rem' }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resource/:id" element={<ResourceDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/sesmag" element={<SESMagInfo />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </Router>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;