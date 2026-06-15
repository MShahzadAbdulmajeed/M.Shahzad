import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FolderOpen, User, LogOut,
  Tag, ChevronRight, Menu, X, Code2,
} from 'lucide-react';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { path: '/admin/projects', label: 'Projects', icon: <FolderOpen size={18} /> },
  { path: '/admin/categories', label: 'Categories', icon: <Tag size={18} /> },
  { path: '/admin/about', label: 'About', icon: <User size={18} /> },
  { path: '/admin/hero', label: 'Hero Section', icon: <Code2 size={18} /> },
];

interface Props {
  children: React.ReactNode;
  onLogout: () => void;
}

export const AdminLayout: React.FC<Props> = ({ children, onLogout }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => { onLogout(); navigate('/'); };

  const sidebarStyle: React.CSSProperties = {
    width: sidebarOpen ? 240 : 64,
    minHeight: '100vh',
    background: 'var(--bg-card)',
    borderRight: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.25s',
    flexShrink: 0,
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        {/* Logo */}
        <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)', height: 64 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Code2 size={16} color="#fff" />
          </div>
          {sidebarOpen && <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-base)', whiteSpace: 'nowrap' }}>Admin Panel</span>}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map(item => {
            const active = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
            return (
              <Link key={item.path} to={item.path}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', borderRadius: 10, textDecoration: 'none',
                  background: active ? 'var(--indigo-dim)' : 'transparent',
                  color: active ? 'var(--indigo)' : 'var(--text-muted)',
                  fontWeight: active ? 700 : 500, fontSize: '0.88rem',
                  transition: 'all 0.15s', whiteSpace: 'nowrap',
                  border: active ? '1px solid rgba(99,102,241,0.2)' : '1px solid transparent',
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)'; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <span style={{ flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
                {sidebarOpen && active && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Link to="/" target="_blank"
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.88rem', whiteSpace: 'nowrap' }}>
            <span style={{ flexShrink: 0 }}>🌐</span>
            {sidebarOpen && <span>View Site</span>}
          </Link>
          <button onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.88rem', cursor: 'pointer', width: '100%', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { (e.currentTarget).style.color = '#f87171'; (e.currentTarget).style.background = 'rgba(248,113,113,0.08)'; }}
            onMouseLeave={e => { (e.currentTarget).style.color = 'var(--text-muted)'; (e.currentTarget).style.background = 'none'; }}
          >
            <LogOut size={18} style={{ flexShrink: 0 }} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, marginLeft: sidebarOpen ? 240 : 64, transition: 'margin-left 0.25s', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Top bar */}
        <header style={{ height: 64, borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16, background: 'var(--bg-card)', position: 'sticky', top: 0, zIndex: 10 }}>
          <button onClick={() => setSidebarOpen(o => !o)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', padding: 4 }}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span style={{ color: 'var(--text-faint)', fontSize: '0.82rem' }}>
            Portfolio Admin — {pathname.replace('/admin', '') || ' Dashboard'}
          </span>
        </header>

        <main style={{ flex: 1, padding: '32px 32px' }}>
          {children}
        </main>
      </div>
    </div>
  );
};
