import React from 'react';

const categories = [
  { name: 'All', icon: '🔍' },
  { name: 'Food Assistance', icon: '🍎' },
  { name: 'Healthcare', icon: '🏥' },
  { name: 'Housing & Shelters', icon: '🏠' },
];

const styles = {
  container: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    margin: '1.5rem 0',
  },
  button: (isActive) => ({
    padding: '0.6rem 1.2rem',
    borderRadius: '25px',
    border: '2px solid #2c7a4b',
    backgroundColor: isActive ? '#2c7a4b' : 'white',
    color: isActive ? 'white' : '#2c7a4b',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'all 0.2s',
  }),
};

function CategoryFilter({ selected, onSelect }) {
  return (
    <div style={styles.container}>
      {categories.map((cat) => (
        <button
          key={cat.name}
          style={styles.button(selected === cat.name)}
          onClick={() => onSelect(cat.name)}
        >
          {cat.icon} {cat.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;