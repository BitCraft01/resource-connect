import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const styles = {
  container: { maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' },
  title: { fontSize: '2rem', fontWeight: 'bold', color: '#2c7a4b', marginBottom: '0.5rem' },
  subtitle: { color: '#666', marginBottom: '2rem' },
  tabs: { display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #eee', paddingBottom: '1rem' },
  tab: (active) => ({
    padding: '0.6rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: active ? '#2c7a4b' : '#f0f0f0',
    color: active ? 'white' : '#333',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
  }),
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '1rem',
  },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' },
  resourceName: { fontWeight: 'bold', fontSize: '1.1rem', color: '#2c7a4b' },
  resourceDetail: { color: '#666', fontSize: '0.9rem' },
  buttonRow: { display: 'flex', gap: '0.5rem' },
  editBtn: { padding: '0.4rem 1rem', backgroundColor: '#1a6896', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  deleteBtn: { padding: '0.4rem 1rem', backgroundColor: '#cc0000', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  addBtn: { padding: '0.7rem 1.5rem', backgroundColor: '#2c7a4b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginBottom: '1.5rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '0.8rem' },
  input: { padding: '0.7rem 1rem', borderRadius: '8px', border: '2px solid #ddd', fontSize: '1rem', outline: 'none' },
  select: { padding: '0.7rem 1rem', borderRadius: '8px', border: '2px solid #ddd', fontSize: '1rem', outline: 'none' },
  saveBtn: { padding: '0.7rem', backgroundColor: '#2c7a4b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' },
  cancelBtn: { padding: '0.7rem', backgroundColor: '#888', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' },
  formTitle: { fontWeight: 'bold', fontSize: '1.2rem', color: '#333', marginBottom: '0.5rem' },
  userRole: (role) => ({
    display: 'inline-block',
    padding: '0.2rem 0.7rem',
    borderRadius: '12px',
    backgroundColor: role === 'admin' ? '#2c7a4b' : '#1a6896',
    color: 'white',
    fontSize: '0.85rem',
    fontWeight: 'bold',
  }),
  statsRow: { display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' },
  statCard: { backgroundColor: 'white', borderRadius: '12px', padding: '1.2rem 2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center', flex: 1 },
  statNumber: { fontSize: '2rem', fontWeight: 'bold', color: '#2c7a4b' },
  statLabel: { color: '#666', fontSize: '0.9rem' },
};

const emptyForm = {
  name: '', description: '', simple_description: '',
  category_id: '1', address: '', phone: '', hours: '',
  requires_id: false, walk_in_available: true,
};

function AdminDashboard() {
  const { token } = useAuth();
  const [tab, setTab] = useState('resources');
  const [resources, setResources] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchResources();
    fetchUsers();
  }, []);

  const fetchResources = async () => {
    const res = await axios.get('http://localhost:3001/api/resources');
    setResources(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:3001/api/admin/users', { headers });
    setUsers(res.data);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/api/admin/resources/${editingId}`, form, { headers });
        setMessage('Resource updated successfully!');
      } else {
        await axios.post('http://localhost:3001/api/admin/resources', form, { headers });
        setMessage('Resource added successfully!');
      }
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      fetchResources();
    } catch (err) {
      setMessage('Error saving resource.');
    }
  };

  const handleEdit = (resource) => {
    setForm({
      name: resource.name,
      description: resource.description,
      simple_description: resource.simple_description,
      category_id: String(resource.category_id),
      address: resource.address || '',
      phone: resource.phone || '',
      hours: resource.hours || '',
      requires_id: resource.requires_id,
      walk_in_available: resource.walk_in_available,
    });
    setEditingId(resource.id);
    setShowForm(true);
    setMessage('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return;
    await axios.delete(`http://localhost:3001/api/admin/resources/${id}`, { headers });
    setMessage('Resource deleted.');
    fetchResources();
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Admin Dashboard</div>
      <div style={styles.subtitle}>Manage resources and users</div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{resources.length}</div>
          <div style={styles.statLabel}>Total Resources</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{users.length}</div>
          <div style={styles.statLabel}>Registered Users</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{users.filter(u => u.role === 'admin').length}</div>
          <div style={styles.statLabel}>Admins</div>
        </div>
      </div>

      {message && (
        <div style={{ backgroundColor: '#eaf7ef', border: '1px solid #2c7a4b', borderRadius: '8px', padding: '0.8rem', marginBottom: '1rem', color: '#2c7a4b', fontWeight: 'bold' }}>
          {message}
        </div>
      )}

      <div style={styles.tabs}>
        <button style={styles.tab(tab === 'resources')} onClick={() => setTab('resources')}>Resources</button>
        <button style={styles.tab(tab === 'users')} onClick={() => setTab('users')}>Users</button>
      </div>

      {tab === 'resources' && (
        <div>
          {!showForm && (
            <button style={styles.addBtn} onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}>
              + Add New Resource
            </button>
          )}

          {showForm && (
            <div style={styles.card}>
              <div style={styles.formTitle}>{editingId ? 'Edit Resource' : 'Add New Resource'}</div>
              <div style={styles.form}>
                <input style={styles.input} name="name" placeholder="Resource name" value={form.name} onChange={handleFormChange} />
                <textarea style={{ ...styles.input, minHeight: '80px' }} name="description" placeholder="Full description" value={form.description} onChange={handleFormChange} />
                <textarea style={{ ...styles.input, minHeight: '60px' }} name="simple_description" placeholder="Simple description (plain language for Dav persona)" value={form.simple_description} onChange={handleFormChange} />
                <select style={styles.select} name="category_id" value={form.category_id} onChange={handleFormChange}>
                  <option value="1">Food Assistance</option>
                  <option value="2">Healthcare</option>
                  <option value="3">Housing & Shelters</option>
                </select>
                <input style={styles.input} name="address" placeholder="Address" value={form.address} onChange={handleFormChange} />
                <input style={styles.input} name="phone" placeholder="Phone number" value={form.phone} onChange={handleFormChange} />
                <input style={styles.input} name="hours" placeholder="Hours (e.g. Mon-Fri 9am-5pm)" value={form.hours} onChange={handleFormChange} />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" name="requires_id" checked={form.requires_id} onChange={handleFormChange} />
                  Requires ID
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" name="walk_in_available" checked={form.walk_in_available} onChange={handleFormChange} />
                  Walk-in Available
                </label>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <button style={styles.saveBtn} onClick={handleSubmit}>{editingId ? 'Update Resource' : 'Add Resource'}</button>
                  <button style={styles.cancelBtn} onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          {resources.map(resource => (
            <div key={resource.id} style={styles.card}>
              <div style={styles.row}>
                <div>
                  <div style={styles.resourceName}>{resource.icon} {resource.name}</div>
                  <div style={styles.resourceDetail}>{resource.category_name} · {resource.address}</div>
                  <div style={styles.resourceDetail}>{resource.hours}</div>
                </div>
                <div style={styles.buttonRow}>
                  <button style={styles.editBtn} onClick={() => handleEdit(resource)}>Edit</button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(resource.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'users' && (
        <div>
          {users.map(user => (
            <div key={user.id} style={styles.card}>
              <div style={styles.row}>
                <div>
                  <div style={styles.resourceName}>{user.name}</div>
                  <div style={styles.resourceDetail}>{user.email}</div>
                  <div style={styles.resourceDetail}>Joined: {new Date(user.created_at).toLocaleDateString()}</div>
                </div>
                <span style={styles.userRole(user.role)}>{user.role}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;