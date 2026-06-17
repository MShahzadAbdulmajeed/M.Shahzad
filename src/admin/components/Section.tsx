import React from 'react';

/**
 * Reusable card section for admin forms.
 * Defined at module level so React never recreates it as a new component type,
 * which would cause inputs inside to lose focus on every keystroke.
 */
export const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px', marginBottom: 20 }}>
    <p style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
      {title}
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {children}
    </div>
  </div>
);
