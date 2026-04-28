import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResourceCard from '../components/ResourceCard';
import CategoryFilter from '../components/CategoryFilter';
import ChatBot from '../components/ChatBot';

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2c7a4b',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#666',
  },
  searchBar: {
    width: '100%',
    padding: '0.8rem 1.2rem',
    fontSize: '1rem',
    borderRadius: '25px',
    border: '2px solid #2c7a4b',
    outline: 'none',
    marginBottom: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    fontSize: '1.1rem',
    marginTop: '2rem',
  },
  loading: {
    textAlign: 'center',
    color: '#2c7a4b',
    fontSize: '1.1rem',
    marginTop: '2rem',
  },
};

function Home() {
  const [resources, setResources] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/api/resources')
      .then(res => {
        setResources(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let results = resources;
    if (category !== 'All') {
      results = results.filter(r => r.category_name === category);
    }
    if (search.trim()) {
      results = results.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.simple_description.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(results);
  }, [category, search, resources]);

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Find Help Near You</h1>
        <p style={styles.subtitle}>
          Free and low-cost resources in Elizabeth, NJ — no complicated forms, no jargon.
        </p>
      </div>

      <input
        style={styles.searchBar}
        placeholder="🔍 Search for food, healthcare, housing..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <CategoryFilter selected={category} onSelect={setCategory} />

      {loading && <p style={styles.loading}>Loading resources...</p>}

      {!loading && filtered.length === 0 && (
        <p style={styles.empty}>No resources found. Try a different search or category.</p>
      )}

      <div style={styles.grid}>
        {filtered.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      <ChatBot />
    </div>
  );
}

export default Home;