import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useLanguage } from '../LanguageContext';
import ResourceCard from '../components/ResourceCard';
import { Link } from 'react-router-dom';

const styles = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' },
  title: { fontSize: '2rem', fontWeight: 'bold', color: '#2c7a4b', marginBottom: '0.5rem' },
  subtitle: { color: '#666', marginBottom: '2rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' },
  empty: { textAlign: 'center', color: '#888', fontSize: '1.1rem', marginTop: '2rem' },
  link: { color: '#2c7a4b', fontWeight: 'bold', textDecoration: 'none' },
};

function Bookmarks() {
  const { token, user } = useAuth();
  const { largeText } = useLanguage();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    axios.get('https://resource-connect-production.up.railway.app/api/auth/bookmarks', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setBookmarks(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [token]);

  if (!user) return (
    <div style={{ ...styles.container, textAlign: 'center', marginTop: '3rem' }}>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>
        Please <Link to="/login" style={styles.link}>log in</Link> to view your saved resources.
      </p>
    </div>
  );

  return (
    <div style={{ ...styles.container, fontSize: largeText ? '1.1rem' : '1rem' }}>
      <div style={styles.title}>🔖 Saved Resources</div>
      <div style={styles.subtitle}>Resources you have bookmarked for later</div>

      {loading && <p style={styles.empty}>Loading...</p>}

      {!loading && bookmarks.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ fontSize: '1.2rem', color: '#888', marginBottom: '1rem' }}>
            You haven't saved any resources yet.
          </p>
          <Link to="/" style={{ ...styles.link, fontSize: '1.1rem' }}>
            Browse resources →
          </Link>
        </div>
      )}

      <div style={styles.grid}>
        {bookmarks.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}

export default Bookmarks;