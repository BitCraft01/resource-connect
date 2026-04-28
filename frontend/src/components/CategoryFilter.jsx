import React from 'react';
import { useLanguage } from '../LanguageContext';

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
    cursor: 'pointer',
  }),
};

function CategoryFilter({ selected, onSelect }) {
  const { t } = useLanguage();

  const categories = [
    { key: 'All', label: t.allCategories, icon: '🔍' },
    { key: 'Food Assistance', label: t.food, icon: '🍎' },
    { key: 'Healthcare', label: t.healthcare, icon: '🏥' },
    { key: 'Housing & Shelters', label: t.housing, icon: '🏠' },
  ];

  return (
    <div style={styles.container}>
      {categories.map((cat) => (
        <button
          key={cat.key}
          style={styles.button(selected === cat.key)}
          onClick={() => onSelect(cat.key)}
        >
          {cat.icon} {cat.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;