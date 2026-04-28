import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const styles = {
  container: {
    maxWidth: '700px',
    margin: '2rem auto',
    padding: '0 1rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  icon: {
    fontSize: '2.5rem',
  },
  name: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#2c7a4b',
  },
  category: {
    color: '#888',
    fontSize: '1rem',
  },
  section: {
    marginTop: '1.5rem',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#444',
    marginBottom: '0.3rem',
  },
  sectionText: {
    fontSize: '1rem',
    color: '#333',
  },
  simpleBanner: {
    backgroundColor: '#eaf7ef',
    border: '1px solid #2c7a4b',
    borderRadius: '10px',
    padding: '1rem',
    marginTop: '1rem',
    fontSize: '1rem',
    color: '#2c7a4b',
  },
  tag: (color) => ({
    display: 'inline-block',
    backgroundColor: color,
    color: 'white',
    borderRadius: '12px',
    padding: '0.3rem 0.8rem',
    fontSize: '0.85rem',
    marginRight: '0.5rem',
    marginTop: '0.5rem',
  }),
  backLink: {
    display: 'inline-block',
    marginBottom: '1rem',
    color: '#2c7a4b',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  callButton: {
    display: 'inline-block',
    marginTop: '1.5rem',
    backgroundColor: '#2c7a4b',
    color: 'white',
    padding: '0.8rem 1.5rem',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  loading: {
    textAlign: 'center',
    marginTop: '3rem',
    color: '#2c7a4b',
  },
};

function ResourceDetail() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/resources/${id}`)
      .then(res => {
        setResource(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (!resource) return <p style={styles.loading}>Resource not found.</p>;

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backLink}>← Back to all resources</Link>

      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.icon}>{resource.icon}</span>
          <div>
            <div style={styles.name}>{resource.name}</div>
            <div style={styles.category}>{resource.category_name} · {resource.city_name}</div>
          </div>
        </div>

        <div style={styles.simpleBanner}>
          💬 <strong>In simple words:</strong> {resource.simple_description}
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>📋 Full Description</div>
          <div style={styles.sectionText}>{resource.description}</div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>📍 Address</div>
          <div style={styles.sectionText}>{resource.address}</div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🕐 Hours</div>
          <div style={styles.sectionText}>{resource.hours}</div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>ℹ️ What you should know</div>
          <div>
            {resource.walk_in_available && (
              <span style={styles.tag('#2c7a4b')}>✅ Walk-in welcome</span>
            )}
            {!resource.requires_id && (
              <span style={styles.tag('#1a6896')}>🪪 No ID required</span>
            )}
            {!resource.requires_income_proof && (
              <span style={styles.tag('#7a4b2c')}>📄 No income proof needed</span>
            )}
          </div>
        </div>

        {resource.phone && (
          <a href={`tel:${resource.phone}`} style={styles.callButton}>
            📞 Call {resource.phone}
          </a>
        )}
      </div>
    </div>
  );
}

export default ResourceDetail;