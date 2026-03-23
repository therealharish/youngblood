import { useState } from 'react';
import { motion } from 'framer-motion';
import { apiUrl } from '../api.js';
import EventsPanel from '../components/admin/EventsPanel.jsx';
import MembersPanel from '../components/admin/MembersPanel.jsx';
import EmailBlastPanel from '../components/admin/EmailBlastPanel.jsx';

const TABS = [
  { id: 'events', label: 'EVENTS' },
  { id: 'members', label: 'MEMBERS' },
  { id: 'email', label: 'EMAIL BLAST' },
];

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(apiUrl('/api/admin/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center" style={{ padding: '2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-3 border-blood bg-dark-gray w-full"
        style={{ maxWidth: '400px', padding: '3rem' }}
      >
        <h1 className="font-heading text-3xl font-bold uppercase tracking-tighter text-off-white mb-2">
          ADMIN
        </h1>
        <p className="text-light-gray text-sm mb-8">YOUNGBLOOD management panel</p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="font-heading text-xs tracking-widest uppercase text-light-gray block mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-black border-2 border-mid-gray text-off-white px-4 py-3 font-heading focus:border-blood focus:outline-none transition-colors"
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="font-heading text-xs tracking-widest uppercase text-light-gray block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black border-2 border-mid-gray text-off-white px-4 py-3 font-heading focus:border-blood focus:outline-none transition-colors"
            />
          </div>

          {error && (
            <p className="text-blood-bright text-sm mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blood text-off-white font-heading font-bold text-lg tracking-wider hover:bg-blood-light transition-colors duration-200 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function Dashboard({ token, onLogout }) {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <div className="min-h-screen bg-black text-off-white">
      {/* Header */}
      <div className="border-b-3 border-blood" style={{ padding: '1.5rem 5vw' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tighter">
                YOUNG<span className="text-blood-bright">BLOOD</span>
              </h1>
              <p className="text-light-gray text-xs tracking-wider">ADMIN DASHBOARD</p>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 border-2 border-mid-gray text-light-gray font-heading text-xs tracking-wider hover:border-blood hover:text-off-white transition-colors cursor-pointer"
            >
              LOGOUT
            </button>
          </div>

          {/* Tab navigation */}
          <div className="flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 font-heading text-xs tracking-wider transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-blood text-off-white'
                    : 'bg-dark-gray text-light-gray hover:bg-mid-gray/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Panel content */}
      <div style={{ padding: '2.5rem 5vw' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {activeTab === 'events' && <EventsPanel token={token} />}
          {activeTab === 'members' && <MembersPanel token={token} />}
          {activeTab === 'email' && <EmailBlastPanel token={token} />}
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem('yb_admin_token'));

  const handleLogin = (newToken) => {
    sessionStorage.setItem('yb_admin_token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('yb_admin_token');
    setToken(null);
  };

  if (!token) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <Dashboard token={token} onLogout={handleLogout} />;
}
