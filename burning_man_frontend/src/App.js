import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Components
import Topbar from './components/Topbar';
import { Sidebar } from './components/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import Directory from './pages/Directory';
import Accommodations from './pages/Accommodations';
import Dues from './pages/Dues';
import Jobs from './pages/Jobs';
import Food from './pages/Food';
import Meals from './pages/Meals';
import Calendar from './pages/Calendar';
import Admin from './pages/Admin';

// Contexts
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';

/**
 * PUBLIC_INTERFACE
 * App
 * Root application component setting up providers, theme, and routes.
 */
function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <UserProvider>
          <BrowserRouter>
            <MainLayout />
          </BrowserRouter>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * MainLayout
 * Provides the application layout with sidebar navigation, topbar, and content area.
 */
function MainLayout() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('Dashboard');

  useEffect(() => {
    const mapping = {
      '/': 'Dashboard',
      '/directory': 'Member Directory',
      '/accommodations': 'Accommodations',
      '/dues': 'Camp Dues',
      '/jobs': 'Camp Jobs',
      '/food': 'Food Sharing',
      '/meals': 'Shared Meals',
      '/calendar': 'Camp Calendar',
      '/admin': 'Admin Panel',
    };
    setPageTitle(mapping[location.pathname] || 'Dashboard');
  }, [location.pathname]);

  const routes = useMemo(() => ([
    { path: '/', element: <Dashboard /> },
    { path: '/directory', element: <Directory /> },
    { path: '/accommodations', element: <Accommodations /> },
    { path: '/dues', element: <Dues /> },
    { path: '/jobs', element: <Jobs /> },
    { path: '/food', element: <Food /> },
    { path: '/meals', element: <Meals /> },
    { path: '/calendar', element: <Calendar /> },
    { path: '/admin', element: <Admin /> },
  ]), []);

  return (
    <div className="layout">
      <Sidebar />
      <header className="topbar">
        <Topbar title={pageTitle} />
      </header>
      <main className="content">
        <h1 className="page-title">{pageTitle}</h1>
        <Routes>
          {routes.map((r) => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}
        </Routes>
      </main>
    </div>
  );
}

export default App;
