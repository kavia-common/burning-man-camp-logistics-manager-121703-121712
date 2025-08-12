import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

/**
 * PUBLIC_INTERFACE
 * Topbar
 * Displays page actions: search, theme toggle, and role switching for demo/admin pages.
 */
function Topbar({ title }) {
  const { theme, toggle } = useTheme();
  const { user, setRole } = useUser();

  return (
    <>
      <div style={{ fontWeight: 800, letterSpacing: '0.4px' }}>{title}</div>
      <div className="search" role="search">
        <span>🔍</span>
        <input
          className="input"
          placeholder="Search within page…"
          aria-label="Search"
          style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none' }}
        />
      </div>
      <div className="actions">
        <button className="btn ghost" onClick={toggle} aria-label="Toggle theme">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <button
          className="btn secondary"
          onClick={() => setRole(user.role === 'admin' ? 'burner' : 'admin')}
          aria-label="Toggle role"
          title="Toggle role for demo"
        >
          {user.role === 'admin' ? '🧑‍🚒 Admin' : '🧑‍🎤 Burner'}
        </button>
      </div>
    </>
  );
}

export default Topbar;
