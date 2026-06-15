import React, { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useDB } from '../../hooks/useDB';
import { saveDBLocal } from '../api';
import { Field, Input, SaveButton } from '../components/Field';
import toast from 'react-hot-toast';
import type { Category } from '../../types/db';

export const AdminCategories: React.FC = () => {
  const { data, loading, invalidate } = useDB();
  const [cats, setCats] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setCats(data.categories);
  }, [data]);

  const update = (idx: number, key: keyof Category, val: string) =>
    setCats(c => c.map((item, i) => i === idx ? { ...item, [key]: val } : item));

  const add = () => setCats(c => [...c, { id: '', name: '' }]);
  const remove = (idx: number) => {
    if (cats[idx].id === 'all') { toast.error("Can't remove the 'All' category"); return; }
    setCats(c => c.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    if (cats.some(c => !c.id.trim() || !c.name.trim())) { toast.error('All categories need an ID and name'); return; }
    setSaving(true);
    try {
      await saveDBLocal({ ...data!, categories: cats });
      invalidate();
      toast.success('Categories saved!');
      window.location.reload();
    } catch (e: any) {
      toast.error(e.message ?? 'Save failed');
    }
    setSaving(false);
  };

  if (loading) return <p style={{ color: 'var(--text-muted)' }}>Loading…</p>;

  return (
    <div style={{ maxWidth: 600 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 }}>Categories</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Control filter tabs shown on the portfolio.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {cats.map((cat, idx) => (
          <div key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <GripVertical size={16} style={{ color: 'var(--text-faint)', flexShrink: 0 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flex: 1 }}>
              <Field label="ID (url-safe)">
                <Input value={cat.id} onChange={e => update(idx, 'id', e.target.value)} placeholder="cv" disabled={cat.id === 'all'} />
              </Field>
              <Field label="Display Name">
                <Input value={cat.name} onChange={e => update(idx, 'name', e.target.value)} placeholder="Computer Vision" />
              </Field>
            </div>
            <button onClick={() => remove(idx)}
              style={{ background: 'none', border: 'none', color: cat.id === 'all' ? 'var(--text-faint)' : '#f87171', cursor: cat.id === 'all' ? 'not-allowed' : 'pointer', flexShrink: 0, padding: 4 }}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={add} className="btn-ghost">
          <Plus size={15} /> Add Category
        </button>
        <SaveButton loading={saving} onClick={handleSave} />
      </div>
    </div>
  );
};
