import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ExternalLink, CheckCircle2,
  Layers, Zap, GitBranch, ChevronRight,
  X, ChevronLeft, Play, Images,
} from 'lucide-react';
import { useDB } from '../hooks/useDB';
import * as Icons from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';

/* ──────────────────────────────────────────────
   Helpers
────────────────────────────────────────────── */
const FadeUp: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
    {children}
  </motion.div>
);

const SectionHeading: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
    <span style={{ color: 'var(--indigo)' }}>{icon}</span>
    <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-base)', whiteSpace: 'nowrap' }}>{title}</h2>
    <div style={{ flex: 1, height: 1, background: 'var(--border)', marginLeft: 8 }} />
  </div>
);

const MetaRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 4 }}>{label}</p>
    {children}
  </div>
);

/* ──────────────────────────────────────────────
   Lightbox
────────────────────────────────────────────── */
const Lightbox: React.FC<{ images: string[]; startIndex: number; onClose: () => void }> = ({ images, startIndex, onClose }) => {
  const [idx, setIdx] = useState(startIndex);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setIdx(i => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={onClose}
    >
      {/* Close */}
      <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: 40, height: 40, borderRadius: 9999, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <X size={20} />
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); }}
          style={{ position: 'absolute', left: 20, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: 44, height: 44, borderRadius: 9999, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Image */}
      <motion.img
        key={idx}
        src={images[idx]}
        alt=""
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '88vw', maxHeight: '84vh', borderRadius: 12, objectFit: 'contain', boxShadow: '0 20px 80px rgba(0,0,0,0.6)' }}
      />

      {/* Next */}
      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); }}
          style={{ position: 'absolute', right: 20, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: 44, height: 44, borderRadius: 9999, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronRight size={22} />
        </button>
      )}

      {/* Counter */}
      <p style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
        {idx + 1} / {images.length}
      </p>
    </motion.div>
  );
};

/* ──────────────────────────────────────────────
   Main component
────────────────────────────────────────────── */
const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useDB();
  const project = data?.projects.find(p => p.id === id) ?? null;
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Project not found</h2>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--indigo)', textDecoration: 'none', fontWeight: 600 }}>
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
    );
  }

  const IconComponent = (Icons as any)[project.icon] || Icons.Code2;
  const hasVideos = project.videos && project.videos.length > 0;

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox images={project.images} startIndex={lightboxIdx} onClose={() => setLightboxIdx(null)} />
        )}
      </AnimatePresence>

      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

        {/* ══ Hero image banner ══ */}
        <div style={{ position: 'relative', height: 'clamp(320px, 45vh, 520px)', overflow: 'hidden' }}>
          <img src={project.coverImage} alt={project.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />

          {/* Strong overlay — dark top so navbar area is readable, very dark bottom for text */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(3,7,18,0.72) 0%, rgba(3,7,18,0.55) 40%, rgba(3,7,18,0.97) 100%)' }} />

          {/* Back button — pushed below navbar (navbar ~68px tall) */}
          <div style={{ position: 'absolute', top: 80, left: 24, zIndex: 10 }}>
            <Link to="/"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', background: 'rgba(99,102,241,0.25)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', padding: '9px 18px', borderRadius: 9999, border: '1px solid rgba(99,102,241,0.45)', transition: 'all 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'rgba(99,102,241,0.5)'; el.style.borderColor = 'rgba(99,102,241,0.8)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'rgba(99,102,241,0.25)'; el.style.borderColor = 'rgba(99,102,241,0.45)'; }}
            >
              <ArrowLeft size={15} /> Back to Portfolio
            </Link>
          </div>

          {/* Title over image */}
          <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0, padding: '0 clamp(16px, 4vw, 48px)' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{ padding: '3px 12px', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 700, background: 'rgba(99,102,241,0.25)', border: '1px solid rgba(99,102,241,0.5)', color: '#c7d2fe', backdropFilter: 'blur(6px)' }}>{tag}</span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <IconComponent size={26} color="#fff" />
                </div>
                <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  {project.name}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* ══ Body ══ */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(24px,4vw,48px) clamp(16px,4vw,24px) 80px' }}>
          <div className="detail-grid">

            {/* ═══ Main column ═══ */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>

              {/* Description */}
              <FadeUp delay={0.05}>
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.85 }}>
                  {project.longDescription ?? project.description}
                </p>
              </FadeUp>

              {/* ── Image Gallery ── */}
              {project.images.length > 0 && (
                <FadeUp delay={0.1}>
                  <section>
                    <SectionHeading icon={<Images size={18} />} title={`Gallery (${project.images.length} photos)`} />
                    <div className="gallery-grid" data-count={project.images.length}>
                      {project.images.map((src, i) => (
                        <motion.div key={i}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setLightboxIdx(i)}
                          style={{
                            borderRadius: 12, overflow: 'hidden', cursor: 'zoom-in',
                            aspectRatio: '4/3', background: 'var(--bg-elevated)',
                            border: '1px solid var(--border)',
                            gridColumn: i === 0 && project.images.length >= 3 ? 'span 2' : undefined,
                          }}
                        >
                          <img src={src} alt={`${project.name} screenshot ${i + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }} />
                        </motion.div>
                      ))}
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: 10 }}>Click any image to open full screen</p>
                  </section>
                </FadeUp>
              )}

              {/* ── Video Section ── */}
              {hasVideos && (
                <FadeUp delay={0.15}>
                  <section>
                    <SectionHeading icon={<Play size={18} />} title="Demo Videos" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      {project.videos!.map((url, i) => (
                        <div key={i} style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-card)', aspectRatio: '16/9' }}>
                          <iframe
                            src={url}
                            title={`${project.name} demo ${i + 1}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                </FadeUp>
              )}

              {/* ── Implementations ── */}
              <FadeUp delay={0.2}>
                <section>
                  <SectionHeading icon={<GitBranch size={18} />} title="Key Implementations" />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
                    {project.implementations.map((p, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06 }}
                        whileHover={{ boxShadow: '0 0 20px rgba(99,102,241,0.2)' }}
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderLeft: '3px solid var(--indigo)', borderRadius: 12, padding: '18px 20px' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <ChevronRight size={14} style={{ color: 'var(--indigo)', flexShrink: 0 }} />
                          <h3 style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-base)' }}>{p.name}</h3>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{p.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </FadeUp>

              {/* ── Tech Stack ── */}
              <FadeUp delay={0.25}>
                <section>
                  <SectionHeading icon={<Layers size={18} />} title="Technical Stack" />
                  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                      {project.tools.map(tool => (
                        <div key={tool}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 10, background: 'var(--bg-elevated)', border: '1px solid var(--border)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', transition: 'border-color 0.2s, color 0.2s', cursor: 'default' }}
                          onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(99,102,241,0.4)'; el.style.color = 'var(--text-base)'; }}
                          onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text-muted)'; }}
                        >
                          <CheckCircle2 size={13} style={{ color: 'var(--emerald)', flexShrink: 0 }} />
                          {tool}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </FadeUp>

              {/* ── Impact ── */}
              <FadeUp delay={0.3}>
                <section>
                  <SectionHeading icon={<Zap size={18} />} title="Impact & Highlights" />
                  <div style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 16, padding: '22px 24px', display: 'flex', gap: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--emerald)', flexShrink: 0 }}>
                      <Zap size={18} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, color: 'var(--emerald)', marginBottom: 6, fontSize: '0.92rem' }}>AI-Powered Impact</p>
                      <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                        This project leverages advanced machine learning to automate complex workflows, deliver real-time insights,
                        and reduce manual effort — bridging cutting-edge AI research with production-ready deployment.
                      </p>
                    </div>
                  </div>
                </section>
              </FadeUp>
            </div>

            {/* ═══ Sticky Sidebar ═══ */}
            <FadeUp delay={0.15}>
              <div className="detail-sidebar">

                {/* CTA buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <a href={project.demoUrl ?? '#'} className="btn-primary" style={{ justifyContent: 'center' }}>
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a href={project.githubUrl ?? '#'}
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 20px', borderRadius: 12, fontWeight: 700, fontSize: '0.9rem', background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)', textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'var(--indigo)'; el.style.color = 'var(--text-base)'; }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text-muted)'; }}
                  >
                    <GithubIcon className="w-4 h-4" />
                    View Source
                  </a>
                </div>

                {/* Metadata */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
                    <p style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-base)' }}>Project Info</p>
                  </div>
                  <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <MetaRow label="Category">
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 6 }}>
                        {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                      </div>
                    </MetaRow>
                    <MetaRow label="Tech Count">
                      <p style={{ color: 'var(--indigo)', fontWeight: 700, fontSize: '1.1rem', marginTop: 4 }}>{project.tools.length} Technologies</p>
                    </MetaRow>
                    <MetaRow label="Implementations">
                      <p style={{ color: 'var(--indigo)', fontWeight: 700, fontSize: '1.1rem', marginTop: 4 }}>{project.implementations.length} Projects</p>
                    </MetaRow>
                    {project.images.length > 0 && (
                      <MetaRow label="Media">
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 4 }}>
                          {project.images.length} images{hasVideos ? ` · ${project.videos!.length} video${project.videos!.length > 1 ? 's' : ''}` : ''}
                        </p>
                      </MetaRow>
                    )}
                  </div>
                </div>

                {/* More projects */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
                    <p style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-base)' }}>More Projects</p>
                  </div>
                  <div style={{ padding: '8px' }}>
                    {Object.values(data?.projects ?? [])
                      .filter(p => p.id !== project.id)
                      .slice(0, 5)
                      .map(p => {
                        return (
                          <Link key={p.id} to={`/project/${p.id}`}
                            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, textDecoration: 'none', transition: 'background 0.15s', color: 'inherit' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                          >
                            {/* Thumbnail */}
                            <div style={{ width: 40, height: 30, borderRadius: 6, overflow: 'hidden', flexShrink: 0, background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                              <img src={p.coverImage} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            </div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', flex: 1 }}>{p.name}</span>
                            <ChevronRight size={13} style={{ color: 'var(--text-faint)', flexShrink: 0 }} />
                          </Link>
                        );
                      })}
                  </div>
                </div>

              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
