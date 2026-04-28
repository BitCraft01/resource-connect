import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  icon: { fontSize: '1.5rem' },
  name: { fontSize: '1.2rem', fontWeight: 'bold', color: '#2c7a4b' },
  description: { color: '#555', fontSize: '0.95rem' },
  tag: function(color) {
    return {
      display: 'inline-block',
      backgroundColor: color,
      color: 'white',
      borderRadius: '12px',
      padding: '0.2rem 0.7rem',
      fontSize: '0.8rem',
      marginRight: '0.4rem',
    };
  },
  link: {
    marginTop: '0.5rem',
    display: 'inline-block',
    color: 'white',
    backgroundColor: '#2c7a4b',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  bookmarkBtn: function(saved) {
    return {
      backgroundColor: saved ? '#f4a116' : 'transparent',
      border: '2px solid ' + (saved ? '#f4a116' : '#ccc'),
      borderRadius: '8px',
      padding: '0.3rem 0.6rem',
      cursor: 'pointer',
      fontSize: '1.1rem',
      transition: 'all 0.2s',
    };
  },
};

function ResourceCard({ resource }) {
  const { user, token } = useAuth();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !token) return;
    axios.get('https://resource-connect-production.up.railway.app/api/auth/bookmarks', {
      headers: { Authorization: 'Bearer ' + token }
    }).then(res => {
      const ids = res.data.map(r => r.id);
      setSaved(ids.includes(resource.id));
    }).catch(() => {});
  }, [user, token, resource.id]);

  const toggleBookmark = async () => {
    if (!user) return alert('Please log in to save resources!');
    setLoading(true);
    try {
      const res = await axios.post(
        'https://resource-connect-production.up.railway.app/api/auth/bookmarks/' + resource.id,
        {},
        { headers: { Authorization: 'Bearer ' + token } }
      );
      setSaved(res.data.bookmarked);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.nameRow}>
          <span style={styles.icon}>{resource.icon}</span>
          <span style={styles.name}>{resource.name}</span>
        </div>
        <button
          style={styles.bookmarkBtn(saved)}
          onClick={toggleBookmark}
          disabled={loading}
          title={saved ? 'Remove bookmark' : 'Save resource'}
        >
          🔖
        </button>
      </div>
      <p style={styles.description}>{resource.simple_description}</p>
      <div>
        {resource.walk_in_available && (
          <span style={styles.tag('#2c7a4b')}>Walk-in OK</span>
        )}
        {!resource.requires_id && (
          <span style={styles.tag('#1a6896')}>No ID needed</span>
        )}
        {resource.hours && (
          <span style={styles.tag('#888')}>{resource.hours}</span>
        )}
      </div>
      <Link to={'/resource/' + resource.id} style={styles.link}>
        See details
      </Link>
    </div>
  );
}

export default ResourceCard;