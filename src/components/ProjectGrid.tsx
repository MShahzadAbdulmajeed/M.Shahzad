import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { useDB } from '../hooks/useDB';

const ProjectGrid: React.FC = () => {
  const { data, loading } = useDB();
  const [activeTab, setActiveTab] = useState('all');

  const categories = data?.categories ?? [{ id: 'all', name: 'All Work' }];
  const projects = data?.projects ?? [];

  const filtered = projects.filter(p =>
    activeTab === 'all' ? true : p.category === activeTab
  );

  if (loading) return (
    <section style={{ padding: '100px 0', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Loading projects…
      </div>
    </section>
  );

  return (
    <section id="projects" style={{ padding: '100px 0', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 60 }}>
          <span className="section-label">✦ Portfolio</span>
          <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 800, textAlign: 'center', marginBottom: 16 }}>
            Featured <span className="grad-text">Projects</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 480, textAlign: 'center', lineHeight: 1.7, marginBottom: 40 }}>
            A curated selection of AI, computer vision, and full-stack projects I've shipped.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setActiveTab(cat.id)}
                style={{
                  padding: '8px 22px', borderRadius: 9999, fontWeight: 600, fontSize: '0.82rem',
                  cursor: 'pointer', transition: 'all 0.2s', border: '1px solid',
                  background: activeTab === cat.id ? 'var(--indigo)' : 'transparent',
                  borderColor: activeTab === cat.id ? 'var(--indigo)' : 'var(--border)',
                  color: activeTab === cat.id ? '#fff' : 'var(--text-muted)',
                  boxShadow: activeTab === cat.id ? '0 4px 16px var(--indigo-glow)' : 'none',
                }}
                onMouseEnter={e => { if (activeTab !== cat.id) (e.currentTarget).style.borderColor = 'var(--indigo)'; }}
                onMouseLeave={e => { if (activeTab !== cat.id) (e.currentTarget).style.borderColor = 'var(--border)'; }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectGrid;
