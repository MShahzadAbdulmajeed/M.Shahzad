import React from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, Tag, User, Code2, ArrowUpRight } from 'lucide-react';
import { useDB } from '../../hooks/useDB';

export const AdminDashboard: React.FC = () => {
  const { data, loading } = useDB();

  const stats = [
    { label: 'Total Projects', value: data?.projects.length ?? 0, icon: <FolderOpen size={22} />, path: '/admin/projects', color: 'var(--indigo)' },
    { label: 'Categories', value: data?.categories.length ?? 0, icon: <Tag size={22} />, path: '/admin/categories', color: 'var(--emerald)' },
    { label: 'About Section', value: 'Edit', icon: <User size={22} />, path: '/admin/about', color: '#f59e0b' },
    { label: 'Hero Section', value: 'Edit', icon: <Code2 size={22} />, path: '/admin/hero', color: '#a78bfa' },
  ];

  if (loading) return <p style={{ color: 'var(--text-muted)' }}>Loading…</p>;

  return (
    <div style={{ maxWidth: 900 }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>Dashboard</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 40, fontSize: '0.9rem' }}>Manage your portfolio content from here.</p>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
        {stats.map(s => (
          <Link key={s.path} to={s.path}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '22px 20px', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.2s, transform 0.2s', display: 'flex', flexDirection: 'column', gap: 14 }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = s.color; el.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border)'; el.style.transform = 'translateY(0)'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: s.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                {s.icon}
              </div>
              <ArrowUpRight size={16} style={{ color: 'var(--text-faint)' }} />
            </div>
            <div>
              <p style={{ fontSize: '1.8rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick project list */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontWeight: 700, fontSize: '0.92rem' }}>Recent Projects</p>
          <Link to="/admin/projects" style={{ fontSize: '0.78rem', color: 'var(--indigo)', textDecoration: 'none', fontWeight: 600 }}>View all →</Link>
        </div>
        {data?.projects.slice(0, 5).map(p => (
          <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
            <img src={p.coverImage} alt={p.name} style={{ width: 44, height: 34, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--border)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: '0.88rem' }}>{p.name}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>{p.tags.slice(0, 2).join(' · ')}</p>
            </div>
            <Link to={`/admin/projects/edit/${p.id}`}
              style={{ fontSize: '0.75rem', color: 'var(--indigo)', textDecoration: 'none', fontWeight: 600, padding: '4px 12px', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 6 }}>
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
