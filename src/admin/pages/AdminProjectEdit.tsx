import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useDB } from '../../hooks/useDB';
import { saveDBLocal } from '../api';
import { Field, Input, Textarea, Select, TagInput, SaveButton } from '../components/Field';
import { ImagePicker, MultiImagePicker } from '../components/ImagePicker';
import toast from 'react-hot-toast';
import type { DB, Project, Implementation } from '../../types/db';

const emptyProject = (): Project => ({
  id: '', name: '', icon: 'Code2', category: 'cv',
  coverImage: '', images: [], videos: [],
  demoUrl: '#', githubUrl: '#',
  tags: [], tools: [],
  description: '', longDescription: '',
  implementations: [],
});

export const AdminProjectEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = id === undefined;
  const { data, loading, invalidate } = useDB();
  const navigate = useNavigate();
  const [form, setForm] = useState<Project>(emptyProject());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew && data) {
      const existing = data.projects.find(p => p.id === id);
      if (existing) setForm({ ...existing });
    }
  }, [data, id, isNew]);

  const set = <K extends keyof Project>(key: K, val: Project[K]) =>
    setForm(f => ({ ...f, [key]: val }));

  const setImpl = (idx: number, key: keyof Implementation, val: string) =>
    setForm(f => {
      const impls = [...f.implementations];
      impls[idx] = { ...impls[idx], [key]: val };
      return { ...f, implementations: impls };
    });

  const addImpl = () => setForm(f => ({ ...f, implementations: [...f.implementations, { name: '', description: '' }] }));
  const removeImpl = (idx: number) => setForm(f => ({ ...f, implementations: f.implementations.filter((_, i) => i !== idx) }));

  const handleSave = async () => {
    if (!form.id.trim()) { toast.error('Project ID is required'); return; }
    if (!form.name.trim()) { toast.error('Project name is required'); return; }
    setSaving(true);
    try {
      let updated: DB;
      if (isNew) {
        updated = { ...data!, projects: [...data!.projects, form] };
      } else {
        updated = { ...data!, projects: data!.projects.map(p => p.id === id ? form : p) };
      }
      await saveDBLocal(updated);
      invalidate();
      toast.success('Project saved!');
      navigate('/admin/projects');
    } catch (e: any) {
      toast.error(e.message ?? 'Save failed');
    }
    setSaving(false);
  };

  if (loading) return <p style={{ color: 'var(--text-muted)' }}>Loading…</p>;

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px', marginBottom: 20 }}>
      <p style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {children}
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 800 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <button onClick={() => navigate('/admin/projects')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{isNew ? 'New Project' : `Edit: ${form.name}`}</h1>
        </div>
      </div>

      {/* Basic info */}
      <Section title="Basic Info">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Project ID" hint="URL slug, no spaces (e.g. my-project)">
            <Input value={form.id} onChange={e => set('id', e.target.value)} disabled={!isNew} placeholder="object-detection" />
          </Field>
          <Field label="Display Name">
            <Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Object Detection" />
          </Field>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Lucide Icon Name" hint="e.g. Eye, Bot, Layers, Server">
            <Input value={form.icon} onChange={e => set('icon', e.target.value)} placeholder="Eye" />
          </Field>
          <Field label="Category">
            <Select value={form.category} onChange={e => set('category', e.target.value)}>
              {data?.categories.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label="Short Description">
          <Textarea value={form.description} onChange={e => set('description', e.target.value)} rows={2} />
        </Field>
        <Field label="Long Description (detail page)">
          <Textarea value={form.longDescription} onChange={e => set('longDescription', e.target.value)} rows={5} />
        </Field>
      </Section>

      {/* Links */}
      <Section title="Links">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Demo URL"><Input value={form.demoUrl} onChange={e => set('demoUrl', e.target.value)} placeholder="https://..." /></Field>
          <Field label="GitHub URL"><Input value={form.githubUrl} onChange={e => set('githubUrl', e.target.value)} placeholder="https://github.com/..." /></Field>
        </div>
      </Section>

      {/* Tags & Tools */}
      <Section title="Tags & Tools">
        <Field label="Tags" hint="Press Enter or comma to add">
          <TagInput value={form.tags} onChange={v => set('tags', v)} placeholder="Computer Vision, Deep Learning…" />
        </Field>
        <Field label="Tools / Tech Stack" hint="Press Enter or comma to add">
          <TagInput value={form.tools} onChange={v => set('tools', v)} placeholder="TensorFlow, OpenCV…" />
        </Field>
      </Section>

      {/* Media */}
      <Section title="Media">
        <ImagePicker
          label="Cover Image"
          hint="This image appears on the project card"
          value={form.coverImage}
          onChange={url => set('coverImage', url)}
        />

        <MultiImagePicker
          label="Gallery Images"
          hint="First image is the cover. Drag to reorder (use ← arrows). Shown in the detail page lightbox."
          value={form.images}
          onChange={imgs => set('images', imgs)}
        />

        <Field label="YouTube Embed URLs (one per line)" hint="Use https://www.youtube.com/embed/VIDEO_ID">
          <Textarea
            value={(form.videos ?? []).join('\n')}
            onChange={e => set('videos', e.target.value.split('\n').filter(Boolean))}
            rows={3}
            placeholder="https://www.youtube.com/embed/VIDEO_ID"
          />
        </Field>
      </Section>

      {/* Implementations */}
      <Section title="Implementations / Sub-projects">
        {form.implementations.map((impl, idx) => (
          <div key={idx} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px', display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
            <button onClick={() => removeImpl(idx)}
              style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
              <Trash2 size={15} />
            </button>
            <Field label={`Implementation ${idx + 1} — Name`}>
              <Input value={impl.name} onChange={e => setImpl(idx, 'name', e.target.value)} placeholder="Real-time Surveillance System" />
            </Field>
            <Field label="Description">
              <Textarea value={impl.description} onChange={e => setImpl(idx, 'description', e.target.value)} rows={2} />
            </Field>
          </div>
        ))}
        <button onClick={addImpl} className="btn-ghost" style={{ alignSelf: 'flex-start' }}>
          <Plus size={15} /> Add Implementation
        </button>
      </Section>

      <SaveButton loading={saving} onClick={handleSave} />
    </div>
  );
};
