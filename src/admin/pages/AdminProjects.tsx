import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { useDB } from '../../hooks/useDB';
import { saveDBLocal } from '../api';
import toast from 'react-hot-toast';
import type { DB } from '../../types/db';

export const AdminProjects: React.FC = () => {
  const { data, loading, invalidate } = useDB();
  const [deleting, setDeleting] = useState<string | null>(null);

  if (loading || !data) return <p style={{ color: 'var(--text-muted)' }}>Loading…</p>;

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    setDeleting(id);
    try {
      const updated: DB = { ...data, projects: data.projects.filter(p => p.id !== id) };
      await saveDBLocal(updated);
      invalidate();
      toast.success('Project deleted');
      window.location.reload();
    } catch {
      toast.error('Failed to delete');
    }
    setDeleting(null);
  };

  return (
    <div style={{ maxWidth: 960 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 }}>Projects</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{data.projects.length} projects total</p>
        </div>
        <Link to="/admin/projects/new" className="btn-primary">
          <Plus size={16} /> New Project
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.projects.map(p => (
          <div key={p.id}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={p.coverImage} alt={p.name}
              style={{ width: 64, height: 48, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--border)', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 3 }}>{p.name}</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-faint)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.description}</p>
              <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                {p.tags.map(t => (
                  <span key={t} style={{ padding: '1px 8px', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 600, background: 'var(--indigo-dim)', color: '#a5b4fc' }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <a href={`/project/${p.id}`} target="_blank" rel="noreferrer"
                style={{ padding: '7px 12px', borderRadius: 8, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8rem', fontWeight: 600 }}>
                <Eye size={14} /> View
              </a>
              <Link to={`/admin/projects/edit/${p.id}`}
                style={{ padding: '7px 12px', borderRadius: 8, background: 'var(--indigo-dim)', border: '1px solid rgba(99,102,241,0.25)', color: 'var(--indigo)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8rem', fontWeight: 600 }}>
                <Pencil size={14} /> Edit
              </Link>
              <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id}
                style={{ padding: '7px 12px', borderRadius: 8, background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8rem', fontWeight: 600 }}>
                <Trash2 size={14} /> {deleting === p.id ? '…' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
