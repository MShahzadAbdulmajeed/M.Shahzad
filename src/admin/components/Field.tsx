import React from 'react';

interface FieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({ label, hint, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
      {label}
    </label>
    {children}
    {hint && <p style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>{hint}</p>}
  </div>
);

const inputBase: React.CSSProperties = {
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border)',
  borderRadius: 10,
  padding: '10px 14px',
  color: 'var(--text-base)',
  fontSize: '0.88rem',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s',
  fontFamily: 'inherit',
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    style={{ ...inputBase, ...props.style }}
    onFocus={e => { e.currentTarget.style.borderColor = 'var(--indigo)'; }}
    onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
  />
);

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea
    {...props}
    style={{ ...inputBase, minHeight: 100, resize: 'vertical', ...props.style }}
    onFocus={e => { e.currentTarget.style.borderColor = 'var(--indigo)'; }}
    onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
  />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <select
    {...props}
    style={{ ...inputBase, cursor: 'pointer', ...props.style }}
    onFocus={e => { e.currentTarget.style.borderColor = 'var(--indigo)'; }}
    onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
  />
);

/** Editable comma-separated list rendered as pills */
export const TagInput: React.FC<{
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder }) => {
  const [input, setInput] = React.useState('');

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) onChange([...value, trimmed]);
    setInput('');
  };

  const remove = (item: string) => onChange(value.filter(v => v !== item));

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '8px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 10, alignItems: 'center' }}>
      {value.map(tag => (
        <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 9999, background: 'var(--indigo-dim)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc', fontSize: '0.75rem', fontWeight: 600 }}>
          {tag}
          <button onClick={() => remove(tag)} style={{ background: 'none', border: 'none', color: '#a5b4fc', cursor: 'pointer', padding: 0, lineHeight: 1 }}>×</button>
        </span>
      ))}
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(); } }}
        placeholder={placeholder ?? 'Type and press Enter'}
        style={{ border: 'none', background: 'none', outline: 'none', color: 'var(--text-base)', fontSize: '0.82rem', minWidth: 140, fontFamily: 'inherit' }}
      />
    </div>
  );
};

export const SaveButton: React.FC<{ loading?: boolean; onClick: () => void }> = ({ loading, onClick }) => (
  <button onClick={onClick} className="btn-primary" style={{ marginTop: 8 }} disabled={loading}>
    {loading ? 'Saving…' : '💾  Save Changes'}
  </button>
);
