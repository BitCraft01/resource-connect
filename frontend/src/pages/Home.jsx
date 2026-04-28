import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResourceCard from '../components/ResourceCard';
import CategoryFilter from '../components/CategoryFilter';
import ChatBot from '../components/ChatBot';
import { useLanguage } from '../LanguageContext';

const tagStyle = function(color) {
  return {
    display: 'inline-block',
    backgroundColor: color,
    color: 'white',
    borderRadius: '12px',
    padding: '0.2rem 0.7rem',
    fontSize: '0.8rem',
  };
};

const styles = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' },
  hero: { textAlign: 'center', marginBottom: '2rem' },
  title: { fontSize: '2rem', fontWeight: 'bold', color: '#2c7a4b', marginBottom: '0.5rem' },
  subtitle: { fontSize: '1.1rem', color: '#666' },
  searchBar: {
    width: '100%', padding: '0.8rem 1.2rem', fontSize: '1rem',
    borderRadius: '25px', border: '2px solid #2c7a4b', outline: 'none', marginBottom: '1rem',
  },
  locationRow: { display: 'flex', gap: '0.8rem', marginBottom: '1rem' },
  locationInput: {
    flex: 1, padding: '0.8rem 1.2rem', fontSize: '1rem',
    borderRadius: '25px', border: '2px solid #1a6896', outline: 'none',
  },
  locationButton: {
    padding: '0.8rem 1.5rem', backgroundColor: '#1a6896', color: 'white',
    border: 'none', borderRadius: '25px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer',
  },
  sectionTitle: {
    fontSize: '1.3rem', fontWeight: 'bold', color: '#333',
    margin: '1.5rem 0 1rem 0', paddingBottom: '0.5rem', borderBottom: '2px solid #eee',
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' },
  placeCard: {
    backgroundColor: 'white', borderRadius: '12px', padding: '1.2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '0.4rem',
  },
  placeName: { fontSize: '1.1rem', fontWeight: 'bold', color: '#1a6896' },
  placeAddress: { fontSize: '0.9rem', color: '#555' },
  placeRow: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.3rem' },
  mapLink: { marginTop: '0.5rem', display: 'inline-block', color: '#1a6896', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 'bold' },
  empty: { textAlign: 'center', color: '#888', fontSize: '1.1rem', marginTop: '2rem' },
  loading: { textAlign: 'center', color: '#2c7a4b', fontSize: '1.1rem', marginTop: '2rem' },
  divider: { margin: '2rem 0', border: 'none', borderTop: '3px dashed #ddd' },
};

function Home() {
    const { t, lowBandwidth } = useLanguage();
  const [resources, setResources] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [placesLoading, setPlacesLoading] = useState(false);
  const [placesError, setPlacesError] = useState('');

  

  useEffect(() => {
    axios.get('http://localhost:3001/api/resources')
      .then(res => { setResources(res.data); setFiltered(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let results = resources;
    if (category !== 'All') results = results.filter(r => r.category_name === category);
    if (search.trim()) {
      results = results.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.simple_description.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(results);
  }, [category, search, resources]);

  const searchNearby = async () => {
    if (!location.trim()) return;
    setPlacesLoading(true);
    setPlacesError('');
    setNearbyPlaces([]);
    try {
      const res = await axios.get('http://localhost:3001/api/places', {
        params: { location, category }
      });
      setNearbyPlaces(res.data);
      if (res.data.length === 0) setPlacesError('No places found. Try a different location.');
    } catch (err) {
      setPlacesError('Could not find places. Please try again.');
    }
    setPlacesLoading(false);
  };

  return (
    <div style={styles.container}>
        {lowBandwidth && (
        <div style={styles.banner}>
          🐢 Low-Bandwidth Mode is ON — simplified view to save data
        </div>
      )}
      <div style={styles.hero}>
        <h1 style={styles.title}>{t.title}</h1>
        <p style={styles.subtitle}>{t.subtitle}</p>
      </div>

      <input
        style={styles.searchBar}
        placeholder={t.searchPlaceholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <CategoryFilter selected={category} onSelect={setCategory} />

      {loading && <p style={styles.loading}>{t.loading}</p>}
      {!loading && filtered.length === 0 && <p style={styles.empty}>{t.noResults}</p>}

      <div style={styles.grid}>
        {filtered.map(resource => (
            lowBandwidth ? (
            <div key={resource.id} style={styles.lowBandCard}>
              <div style={{ fontWeight: 'bold', color: '#2c7a4b' }}>
                {resource.category_name} — {resource.name}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#555', margin: '0.3rem 0' }}>
                {resource.simple_description}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#888' }}>
                {resource.address} · {resource.phone}
              </div>
              <a href={`/resource/${resource.id}`} style={{ color: '#2c7a4b', fontWeight: 'bold', fontSize: '0.9rem' }}>
                {t.seeDetails}
              </a>
            </div>
          ) : (
          <ResourceCard key={resource.id} resource={resource} />
          )
        ))}
      </div>

      <hr style={styles.divider} />

      <div style={styles.sectionTitle}>{t.nearbyTitle}</div>
      <p style={{ color: '#666', marginBottom: '1rem' }}>{t.nearbySubtitle}</p>

      <div style={styles.locationRow}>
        <input
          style={styles.locationInput}
          placeholder={t.locationPlaceholder}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchNearby()}
        />
        <button style={styles.locationButton} onClick={searchNearby}>
          {t.searchButton}
        </button>
      </div>

      {placesLoading && <p style={styles.loading}>Searching for nearby places...</p>}
      {placesError && <p style={styles.empty}>{placesError}</p>}

      {nearbyPlaces.length > 0 && (
        <div>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            {t.foundPlaces} <strong>{nearbyPlaces.length}</strong> {t.placesNear} <strong>{location}</strong>
          </p>
          <div style={styles.grid}>
            {nearbyPlaces.map(place => (
                lowBandwidth ? (
                <div key={place.id} style={styles.lowBandPlaceCard}>
                  <div style={{ fontWeight: 'bold', color: '#1a6896' }}>{place.name}</div>
                  <div style={{ fontSize: '0.9rem', color: '#555' }}>{place.address}</div>
                  {place.rating && (
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>{t.rating}: {place.rating}</div>
                  )}
                  <a
                    href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place.name + ' ' + place.address)}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#1a6896', fontWeight: 'bold', fontSize: '0.9rem' }}
                  >
                    {t.viewOnMaps}
                  </a>
                </div>
              ) : (
              <div key={place.id} style={styles.placeCard}>
                <div style={styles.placeName}>{place.name}</div>
                <div style={styles.placeAddress}>{place.address}</div>
                <div style={styles.placeRow}>
                  {place.rating && (
                    <span style={tagStyle('#f4a116')}>{t.rating}: {place.rating}</span>
                  )}
                  {place.open_now === true && (
                    <span style={tagStyle('#2c7a4b')}>{t.openNow}</span>
                  )}
                  {place.open_now === false && (
                    <span style={tagStyle('#888')}>{t.closedNow}</span>
                  )}
                </div>
                <a
                  href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place.name + ' ' + place.address)}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.mapLink}
                >
                  {t.viewOnMaps}
                </a>
              </div>
              )
            ))}
          </div>
        </div>
      )}

      <ChatBot />
    </div>
  );
}

export default Home;