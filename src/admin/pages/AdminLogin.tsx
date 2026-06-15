import React, { useState } from 'react';
import { Code2, Lock } from 'lucide-react';

interface Props { onLogin: (pw: string) => boolean; }

export const AdminLogin: React.FC<Props> = ({ onLogin }) => {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const ok = onLogin(pw);
      if (!ok) { setError('Incorrect password. Try again.'); setPw(''); }
      setLoading(false);
    }, 400);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 40, gap: 12 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Code2 size={28} color="#fff" />
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Portfolio Admin</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Sign in to manage your content</p>
        </div>

        {/* Card */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '32px 28px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Admin Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }} />
                <input
                  type="password" value={pw} onChange={e => { setPw(e.target.value); setError(''); }}
                  placeholder="Enter password"
                  style={{ width: '100%', background: 'var(--bg-elevated)', border: `1px solid ${error ? '#f87171' : 'var(--border)'}`, borderRadius: 10, padding: '11px 14px 11px 40px', color: 'var(--text-base)', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                  autoFocus
                />
              </div>
              {error && <p style={{ color: '#f87171', fontSize: '0.78rem' }}>{error}</p>}
            </div>

            <button type="submit" className="btn-primary" style={{ justifyContent: 'center', opacity: loading ? 0.7 : 1 }} disabled={loading}>
              {loading ? 'Verifying…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.78rem', color: 'var(--text-faint)' }}>
          Set <code>VITE_ADMIN_PASSWORD</code> in your .env file
        </p>
      </div>
    </div>
  );
};
