import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useLanguage } from '../LanguageContext';

const styles = {
  nav: {
    backgroundColor: '#2c7a4b',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
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
    gap: '0.8rem',
    flexWrap: 'wrap',
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
  langButton: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid white',
    borderRadius: '8px',
    padding: '0.4rem 1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
  lowBandBtn: (active) => ({
    backgroundColor: active ? '#cc7000' : 'transparent',
    color: 'white',
    border: '2px solid white',
    borderRadius: '8px',
    padding: '0.4rem 1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.95rem',
  }),
};

function Navbar() {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t, lowBandwidth, toggleLowBandwidth } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        🌱 {t.brand}
      </Link>
      <div style={styles.right}>
        <button style={styles.langButton} onClick={toggleLanguage}>
          {language === 'en' ? '🇪🇸 Español' : '🇺🇸 English'}
        </button>
        <button style={styles.lowBandBtn(lowBandwidth)} onClick={toggleLowBandwidth}>
  {lowBandwidth ? '📶 Normal Mode' : '🐢 Low-Bandwidth'}
</button>
        {user ? (
          <>
            <span style={styles.username}>👋 {t.tagline.includes('help') ? 'Hi' : 'Hola'}, {user.name}! ({user.role})</span>
            {user.role === 'admin' && (
              <Link to="/admin" style={{ ...styles.button, backgroundColor: '#f4a116' }}>{t.admin}</Link>
            )}
            <button style={styles.button} onClick={handleLogout}>{t.logout}</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.button}>{t.login}</Link>
            <Link to="/register" style={{ ...styles.button, backgroundColor: '#cceedd' }}>{t.register}</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;