import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../types/db';
import * as Icons from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [hovered, setHovered] = useState(false);
  const IconComponent = (Icons as any)[project.icon] || Icons.Code2;

  return (
    <motion.a
      href={`/project/${project.id}`}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.35 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit',
        borderRadius: 16, overflow: 'hidden', background: 'var(--bg-card)',
        border: '1px solid var(--border)', transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
        boxShadow: hovered ? '0 8px 40px rgba(99,102,241,0.18)' : '0 2px 12px rgba(0,0,0,0.25)',
        borderColor: hovered ? 'rgba(99,102,241,0.5)' : 'var(--border)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        cursor: 'pointer',
      }}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: 'var(--bg-elevated)' }}>
        <img src={project.coverImage} alt={project.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)', display: 'block' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,7,18,0.85) 0%, rgba(3,7,18,0.2) 60%, transparent 100%)', opacity: hovered ? 1 : 0.5, transition: 'opacity 0.3s' }} />
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tags.slice(0, 2).map(tag => (
            <span key={tag} style={{ padding: '3px 10px', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, background: 'rgba(3,7,18,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(99,102,241,0.35)', color: '#a5b4fc', letterSpacing: '0.03em' }}>{tag}</span>
          ))}
        </div>
        <div style={{ position: 'absolute', top: 12, right: 12, width: 34, height: 34, borderRadius: 9999, background: 'rgba(99,102,241,0.9)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered ? 1 : 0, transition: 'opacity 0.25s' }}>
          <ArrowUpRight size={16} color="#fff" />
        </div>
        <div style={{ position: 'absolute', bottom: 12, left: 12, width: 36, height: 36, borderRadius: 10, background: 'rgba(3,7,18,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--indigo)' }}>
          <IconComponent size={18} />
        </div>
      </div>

      <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 6, color: hovered ? 'var(--indigo)' : 'var(--text-base)', transition: 'color 0.2s' }}>
          {project.name}
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: 14 }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
          {project.tools.slice(0, 3).map(tool => (
            <span key={tool} style={{ padding: '2px 9px', borderRadius: 6, fontSize: '0.7rem', fontWeight: 600, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-faint)' }}>{tool}</span>
          ))}
          {project.tools.length > 3 && <span style={{ padding: '2px 9px', borderRadius: 6, fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-faint)' }}>+{project.tools.length - 3}</span>}
        </div>
      </div>
    </motion.a>
  );
};

export default ProjectCard;
