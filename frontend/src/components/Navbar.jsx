import React from 'react';
import { Link } from 'react-router-dom';

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
  tagline: {
    color: '#cceedd',
    fontSize: '0.9rem',
  },
};

function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        🌱 ResourceConnect
      </Link>
      <span style={styles.tagline}>Finding help made simple</span>
    </nav>
  );
}

export default Navbar;