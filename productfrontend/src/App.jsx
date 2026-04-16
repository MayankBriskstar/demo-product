import React, { useState, useEffect } from 'react';
import { apiSvc, authSvc } from './services/api';

function App() {
  const [items, setItems] = useState([]);
  const [colors, setColors] = useState([]);
  const [auth, setAuth] = useState(authSvc.isLoggedIn());
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [page, setPage] = useState('list');
  const [form, setForm] = useState({ name: '', price: 0, color: '' });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (auth) load();
  }, [auth]);

  const load = async () => {
    setBusy(true);
    try {
      const data = await apiSvc.getItems();
      setItems(data);
      updateColors(data);
    } catch {
      setMsg('Failed to load items.');
    } finally {
      setBusy(false);
    }
  };

  const updateColors = (list) => {
    const unique = [...new Set(list.map(i => i.color))].filter(c => c);
    setColors(unique);
  };

  const onFilter = async (color) => {
    setFilter(color);
    setBusy(true);
    try {
      const data = color ? await apiSvc.getByColor(color) : await apiSvc.getItems();
      setItems(data);
    } catch {
      setMsg('Filter failed.');
    } finally {
      setBusy(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      await authSvc.login(e.target.user.value, e.target.pass.value);
      setAuth(true);
      setMsg('');
    } catch {
      setMsg('Invalid login.');
    }
  };

  const logout = () => {
    authSvc.logout();
    setAuth(false);
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      await apiSvc.add(form);
      setForm({ name: '', price: 0, color: '' });
      setPage('list');
      await load();
      setFilter('');
    } catch {
      setMsg('Could not save product.');
    }
  };

  if (!auth) {
    return (
      <div style={{ maxWidth: '350px', margin: '100px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '5px', fontFamily: 'Arial' }}>
        <h3>Please Login</h3>
        <form onSubmit={login}>
          <input name="user" placeholder="User" style={{ width: '100%', marginBottom: '10px', padding: '10px' }} defaultValue="admin" />
          <input name="pass" type="password" placeholder="Pass" style={{ width: '100%', marginBottom: '10px', padding: '10px' }} defaultValue="password123" />
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none' }}>Go</button>
        </form>
        {msg && <p style={{ color: 'red' }}>{msg}</p>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', fontFamily: 'Arial', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        <h2>My Inventory</h2>
        <button onClick={logout} style={{ border: 'none', color: '#fff', background: '#666', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}>Log out</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <button onClick={() => setPage('list')} style={{ padding: '8px 12px', background: page === 'list' ? '#18a327' : '#eee', color: page === 'list' ? '#fff' : '#000', border: 'none' }}>All Items</button>
          <button onClick={() => setPage('create')} style={{ padding: '8px 12px', background: page === 'create' ? '#1f6eff' : '#eee', color: page === 'create' ? '#fff' : '#000', border: 'none' }}>New Product</button>
          
          <select value={filter} onChange={(e) => onFilter(e.target.value)} style={{ padding: '8px', background: '#a134bd', color: '#fff' }}>
            <option value="">Filter by Color</option>
            {colors.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {page === 'create' ? (
          <div>
            <h3>New Product</h3>
            <form onSubmit={save} style={{ display: 'grid', gap: '15px' }}>
              <input required placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ padding: '10px' }} />
              <input required placeholder="Color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} style={{ padding: '10px' }} />
              <input required type="number" step="0.01" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })} style={{ padding: '10px' }} />
              <button type="submit" style={{ width: '150px', padding: '10px', background: '#28a745', color: '#fff', border: 'none' }}>Save</button>
            </form>
          </div>
        ) : (
          <div>
            {busy ? <p>Loading...</p> : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                    <th style={{ padding: '10px' }}>Name</th>
                    <th style={{ padding: '10px' }}>Color</th>
                    <th style={{ padding: '10px' }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(i => (
                    <tr key={i.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '10px' }}>{i.name}</td>
                      <td style={{ padding: '10px' }}>{i.color}</td>
                      <td style={{ padding: '10px' }}>${i.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {items.length === 0 && !busy && <p>No products yet.</p>}
          </div>
        )}
      </div>
      {msg && <p style={{ color: 'red', marginTop: '10px' }}>{msg}</p>}
    </div>
  );
}

export default App;
