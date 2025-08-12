import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Sidebar
 * Camp navigation sidebar with links to core modules.
 */
export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="dot" />
        HME Camp
      </div>
      <nav className="nav">
        <NavLink to="/" end>🏕️ Dashboard</NavLink>
        <NavLink to="/directory">🧑‍🤝‍🧑 Directory</NavLink>
        <NavLink to="/accommodations">⛺ Accommodations</NavLink>
        <NavLink to="/dues">💸 Dues</NavLink>
        <NavLink to="/jobs">🛠️ Jobs</NavLink>
        <NavLink to="/food">🥫 Food</NavLink>
        <NavLink to="/meals">🍽️ Meals</NavLink>
        <NavLink to="/calendar">📅 Calendar</NavLink>
        <NavLink to="/admin">🛡️ Admin</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
