-- Cities
INSERT INTO cities (name, state) VALUES ('Elizabeth', 'NJ');

-- Categories
INSERT INTO categories (name, icon) VALUES
  ('Food Assistance', '🍎'),
  ('Healthcare', '🏥'),
  ('Housing & Shelters', '🏠');

-- Resources
INSERT INTO resources 
  (name, description, simple_description, category_id, city_id, address, phone, hours, requires_id, walk_in_available)
VALUES
  (
    'Community Food Pantry',
    'Provides supplemental food assistance to individuals and families in need.',
    'A place where you can get free food. No appointment needed. Just walk in.',
    1, 1, '123 Main St, Elizabeth, NJ', '908-555-0101',
    'Mon-Fri 9am-4pm', false, true
  ),
  (
    'St. Joseph Health Clinic',
    'Free and low-cost medical services for uninsured and underinsured residents.',
    'A free clinic where you can see a doctor without health insurance.',
    2, 1, '456 Oak Ave, Elizabeth, NJ', '908-555-0202',
    'Tue & Thu 10am-6pm', true, false
  ),
  (
    'Family Shelter of Union County',
    'Emergency shelter and transitional housing for individuals and families.',
    'A safe place to stay if you have nowhere to sleep. Families welcome.',
    3, 1, '789 Elm Rd, Elizabeth, NJ', '908-555-0303',
    'Open 24/7', false, true
  );