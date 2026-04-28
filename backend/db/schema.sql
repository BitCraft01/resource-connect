CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  state VARCHAR(50)
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  icon VARCHAR(50)
);

CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  simple_description TEXT,
  category_id INT REFERENCES categories(id),
  city_id INT REFERENCES cities(id),
  address VARCHAR(300),
  phone VARCHAR(20),
  website VARCHAR(200),
  hours VARCHAR(200),
  requires_id BOOLEAN DEFAULT false,
  requires_income_proof BOOLEAN DEFAULT false,
  walk_in_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE bookmarks (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(100),
  resource_id INT REFERENCES resources(id),
  created_at TIMESTAMP DEFAULT NOW()
);