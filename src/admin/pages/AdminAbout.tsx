import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import { useDB } from '../../hooks/useDB';
import { saveDBLocal } from '../api';
import { Field, Input, Textarea, TagInput, SaveButton } from '../components/Field';
import { ImagePicker } from '../components/ImagePicker';
import { Section } from '../components/Section';
import toast from 'react-hot-toast';
import type { About, SkillGroup } from '../../types/db';

export const AdminAbout: React.FC = () => {
  const { data, loading, invalidate } = useDB();
  const [form, setForm] = useState<About | null>(null);
  const [saving, setSaving] = useState(false);
  const [cvUploading, setCvUploading] = useState(false);

  useEffect(() => {
    if (data) setForm({ ...data.about });
  }, [data]);

  const set = <K extends keyof About>(key: K, val: About[K]) =>
    setForm(f => f ? { ...f, [key]: val } : f);

  const setSkillGroup = (idx: number, key: keyof SkillGroup, val: any) =>
    setForm(f => {
      if (!f) return f;
      const groups = [...f.skillGroups];
      groups[idx] = { ...groups[idx], [key]: val };
      return { ...f, skillGroups: groups };
    });

  const addSkillGroup = () =>
    setForm(f => f ? { ...f, skillGroups: [...f.skillGroups, { label: '', items: [] }] } : f);

  const removeSkillGroup = (idx: number) =>
    setForm(f => f ? { ...f, skillGroups: f.skillGroups.filter((_, i) => i !== idx) } : f);

  /** Handle CV file upload — saves to public/uploads/cv/ */
  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') { toast.error('Only PDF files allowed'); return; }
    setCvUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload-cv', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const { url } = await res.json();
      set('cvUrl', url);
      toast.success('CV uploaded!');
    } catch (err: any) {
      toast.error(err.message ?? 'Upload failed');
    }
    setCvUploading(false);
  };

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    try {
      await saveDBLocal({ ...data!, about: form });
      invalidate();
      toast.success('About section saved!');
    } catch (e: any) {
      toast.error(e.message ?? 'Save failed');
    }
    setSaving(false);
  };

  if (loading || !form) return <p style={{ color: 'var(--text-muted)' }}>Loading…</p>;

  return (
    <div style={{ maxWidth: 800 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 }}>About Section</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Manage your personal info, bio, skills, and CV.</p>
      </div>

      <Section title="Personal Info">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Your Name / Title">
            <Input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Full-Stack AI Engineer" />
          </Field>
          <Field label="Availability Status">
            <Input value={form.availability} onChange={e => set('availability', e.target.value)} placeholder="Available for Freelance" />
          </Field>
          <Field label="Email">
            <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} />
          </Field>
          <Field label="Phone">
            <Input value={form.phone} onChange={e => set('phone', e.target.value)} />
          </Field>
          <Field label="Location">
            <Input value={form.location} onChange={e => set('location', e.target.value)} />
          </Field>
        </div>
        <ImagePicker
          label="Profile Photo"
          hint="Upload or pick from gallery. Use /shahzad_image.jpg for the default."
          value={form.photo}
          onChange={url => set('photo', url)}
        />
        <Field label="Bio">
          <Textarea value={form.bio} onChange={e => set('bio', e.target.value)} rows={4} />
        </Field>
      </Section>

      <Section title="Social Links">
        <Field label="GitHub URL">
          <Input value={form.githubUrl} onChange={e => set('githubUrl', e.target.value)} placeholder="https://github.com/..." />
        </Field>
        <Field label="LinkedIn URL">
          <Input value={form.linkedinUrl} onChange={e => set('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/..." />
        </Field>
      </Section>

      <Section title="CV / Resume">
        <Field label="Current CV URL" hint="Leave blank to hide the Download CV button">
          <Input value={form.cvUrl} onChange={e => set('cvUrl', e.target.value)} placeholder="/uploads/cv/resume.pdf" />
        </Field>
        <Field label="Upload New CV (PDF)">
          <label style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', borderRadius: 10, border: '1px dashed var(--border)',
            color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
            background: 'var(--bg-elevated)', transition: 'border-color 0.2s',
          }}>
            <Upload size={16} />
            {cvUploading ? 'Uploading…' : 'Choose PDF file'}
            <input type="file" accept=".pdf" onChange={handleCvUpload} style={{ display: 'none' }} disabled={cvUploading} />
          </label>
          {form.cvUrl && (
            <a href={form.cvUrl} target="_blank" rel="noreferrer"
              style={{ fontSize: '0.78rem', color: 'var(--indigo)', marginTop: 6, display: 'block' }}>
              📄 Preview current CV
            </a>
          )}
        </Field>
      </Section>

      <Section title="Skill Groups">
        {form.skillGroups.map((group, idx) => (
          <div key={idx} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}>
            <button onClick={() => removeSkillGroup(idx)}
              style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
              <Trash2 size={15} />
            </button>
            <Field label="Group Label (e.g. AI / ML)">
              <Input value={group.label} onChange={e => setSkillGroup(idx, 'label', e.target.value)} placeholder="AI / ML" />
            </Field>
            <Field label="Skills" hint="Press Enter to add">
              <TagInput value={group.items} onChange={v => setSkillGroup(idx, 'items', v)} placeholder="TensorFlow, PyTorch…" />
            </Field>
          </div>
        ))}
        <button onClick={addSkillGroup} className="btn-ghost" style={{ alignSelf: 'flex-start' }}>
          <Plus size={15} /> Add Skill Group
        </button>
      </Section>

      <SaveButton loading={saving} onClick={handleSave} />
    </div>
  );
};
