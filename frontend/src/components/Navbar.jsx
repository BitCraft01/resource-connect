import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const styles = {
  nav: {
    backgroundColor: '#2c7a4b',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  username: {
    color: '#cceedd',
    fontSize: '0.95rem',
  },
  button: {
    backgroundColor: 'white',
    color: '#2c7a4b',
    border: 'none',
    borderRadius: '8px',
    padding: '0.4rem 1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.95rem',
    textDecoration: 'none',
  },
};

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        🌱 ResourceConnect
      </Link>
      <div style={styles.right}>
        {user ? (
  <>
    <span style={styles.username}>👋 Hi, {user.name}! ({user.role})</span>
    {user.role === 'admin' && (
      <Link to="/admin" style={{ ...styles.button, backgroundColor: '#f4a116' }}>Admin</Link>
    )}
    <button style={styles.button} onClick={handleLogout}>Log Out</button>
  </>
        ) : (
          <>
            <Link to="/login" style={styles.button}>Log In</Link>
            <Link to="/register" style={{ ...styles.button, backgroundColor: '#cceedd' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;