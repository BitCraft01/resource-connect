import React from 'react';
import { Link } from 'react-router-dom';

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
    gap: '0.5rem',
  },
  icon: {
    fontSize: '1.5rem',
  },
  name: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#2c7a4b',
  },
  description: {
    color: '#555',
    fontSize: '0.95rem',
  },
  tag: (color) => ({
    display: 'inline-block',
    backgroundColor: color,
    color: 'white',
    borderRadius: '12px',
    padding: '0.2rem 0.7rem',
    fontSize: '0.8rem',
    marginRight: '0.4rem',
  }),
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
};

function ResourceCard({ resource }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.icon}>{resource.icon}</span>
        <span style={styles.name}>{resource.name}</span>
      </div>
      <p style={styles.description}>{resource.simple_description}</p>
      <div>
        {resource.walk_in_available && (
          <span style={styles.tag('#2c7a4b')}>✅ Walk-in OK</span>
        )}
        {!resource.requires_id && (
          <span style={styles.tag('#1a6896')}>🪪 No ID needed</span>
        )}
        {resource.hours && (
          <span style={styles.tag('#888')}>🕐 {resource.hours}</span>
        )}
      </div>
      <Link to={`/resource/${resource.id}`} style={styles.link}>
        See details →
      </Link>
    </div>
  );
}

export default ResourceCard;