import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { AdminLogin } from './pages/AdminLogin';
import { AdminLayout } from './components/AdminLayout';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminProjects } from './pages/AdminProjects';
import { AdminProjectEdit } from './pages/AdminProjectEdit';
import { AdminCategories } from './pages/AdminCategories';
import { AdminAbout } from './pages/AdminAbout';
import { AdminHero } from './pages/AdminHero';

export const AdminApp: React.FC = () => {
  const { authed, login, logout } = useAdminAuth();

  if (!authed) {
    return <AdminLogin onLogin={login} />;
  }

  return (
    <AdminLayout onLogout={logout}>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="projects/new" element={<AdminProjectEdit />} />
        <Route path="projects/edit/:id" element={<AdminProjectEdit />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="about" element={<AdminAbout />} />
        <Route path="hero" element={<AdminHero />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};
