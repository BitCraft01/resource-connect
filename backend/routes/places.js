const express = require('express');
const router = express.Router();
require('dotenv').config({ override: true });

const CATEGORY_QUERIES = {
  'Food Assistance': 'food pantry OR food bank',
  'Healthcare': 'free clinic OR community health center',
  'Housing & Shelters': 'homeless shelter OR housing assistance',
  'All': 'food pantry OR free clinic OR homeless shelter',
};

router.get('/', async (req, res) => {
  const { location, category = 'All' } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  try {
    const query = CATEGORY_QUERIES[category] || CATEGORY_QUERIES['All'];
    const searchQuery = `${query} near ${location}`;

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error('Places API error:', data.status, data.error_message);
      throw new Error(data.error_message || 'Places API error');
    }

    const places = (data.results || []).slice(0, 8).map(place => ({
      id: place.place_id,
      name: place.name,
      address: place.formatted_address,
      rating: place.rating,
      open_now: place.opening_hours?.open_now,
      location: place.geometry.location,
    }));

    res.json(places);
  } catch (err) {
    console.error('Places error:', err.message);
    res.status(500).json({ error: 'Could not fetch nearby places' });
  }
});

module.exports = router;