import React, { useState, useEffect } from 'react';
import { useDB } from '../../hooks/useDB';
import { saveDBLocal } from '../api';
import { Field, Input, Textarea, TagInput, SaveButton } from '../components/Field';
import toast from 'react-hot-toast';
import type { Hero } from '../../types/db';

export const AdminHero: React.FC = () => {
  const { data, loading, invalidate } = useDB();
  const [form, setForm] = useState<Hero | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setForm({ ...data.hero });
  }, [data]);

  const set = <K extends keyof Hero>(key: K, val: Hero[K]) =>
    setForm(f => f ? { ...f, [key]: val } : f);

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    try {
      await saveDBLocal({ ...data!, hero: form });
      invalidate();
      toast.success('Hero section saved!');
    } catch (e: any) {
      toast.error(e.message ?? 'Save failed');
    }
    setSaving(false);
  };

  if (loading || !form) return <p style={{ color: 'var(--text-muted)' }}>Loading…</p>;

  return (
    <div style={{ maxWidth: 700 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 }}>Hero Section</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Edit the landing hero — name, badge, rotating roles, and description.</p>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '28px', display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Field label="Your Name">
          <Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Shahzad" />
        </Field>

        <Field label="Badge Text" hint="Small pill shown above the heading">
          <Input value={form.badge} onChange={e => set('badge', e.target.value)} placeholder="Open for new AI opportunities" />
        </Field>

        <Field label="Rotating Roles" hint="One role per line — cycles every 3s">
          <Textarea
            value={form.roles.join('\n')}
            onChange={e => set('roles', e.target.value.split('\n').filter(Boolean))}
            rows={6}
            placeholder="Full-Stack AI Engineer&#10;LLM Specialist&#10;Computer Vision Expert"
          />
        </Field>

        <Field label="Description">
          <Textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} />
        </Field>

        <Field label="Highlight Words" hint="These words will appear bold/white in the description. Press Enter to add.">
          <TagInput
            value={form.highlightWords}
            onChange={v => set('highlightWords', v)}
            placeholder="Autonomous Agents…"
          />
        </Field>
      </div>

      {/* Live preview */}
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px', marginTop: 16, marginBottom: 20 }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Preview</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--indigo)', marginBottom: 6 }}>✦ {form.badge}</p>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 6 }}>Hi, I'm <span className="grad-text">{form.name}</span></h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          {form.description.split(' ').map((word, i) => (
              <span key={i} style={form.highlightWords.some(hw => hw.includes(word)) ? { color: 'var(--text-base)', fontWeight: 700 } : {}}>
                {word}{' '}
              </span>
            ))}
        </p>
      </div>

      <SaveButton loading={saving} onClick={handleSave} />
    </div>
  );
};
