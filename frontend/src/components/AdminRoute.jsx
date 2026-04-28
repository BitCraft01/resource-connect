import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function AdminRoute({ children }) {
  const { user } = useAuth();
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setWaiting(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (waiting) return <div style={{ textAlign: 'center', marginTop: '3rem', color: '#2c7a4b' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'admin') return <Navigate to="/" />;
  return children;
}

export default AdminRoute;