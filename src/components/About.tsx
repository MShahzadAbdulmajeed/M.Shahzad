import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Download, ExternalLink } from 'lucide-react';
import { useDB } from '../hooks/useDB';

const About: React.FC = () => {
  const { data } = useDB();
  const about = data?.about;

  if (!about) return null;

  const info = [
    { icon: <Mail size={16} />, label: about.email },
    { icon: <Phone size={16} />, label: about.phone },
    { icon: <MapPin size={16} />, label: about.location },
    { icon: <User size={16} />, label: about.availability },
  ];

  return (
    <section id="about" style={{ padding: '100px 0', background: 'var(--bg-elevated)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 64 }}>
          <span className="section-label">✦ Who I Am</span>
          <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 800, textAlign: 'center' }}>
            About <span className="grad-text">Me</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 56, alignItems: 'start' }}>
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: -2, borderRadius: 20, background: 'linear-gradient(135deg, var(--indigo), var(--emerald))', filter: 'blur(16px)', opacity: 0.3 }} />
              <div style={{ position: 'relative', background: 'var(--bg-card)', borderRadius: 18, padding: 6, border: '1px solid var(--border)' }}>
                <img src={about.photo} alt="M.Shahzad"
                  style={{ width: '100%', borderRadius: 14, display: 'block', filter: 'grayscale(30%)', transition: 'filter 0.5s' }}
                  onMouseEnter={e => ((e.target as HTMLImageElement).style.filter = 'grayscale(0%)')}
                  onMouseLeave={e => ((e.target as HTMLImageElement).style.filter = 'grayscale(30%)')}
                />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: 36 }}>
              I'm a dedicated{' '}
              <span style={{ color: 'var(--text-base)', fontWeight: 700 }}>{about.title}</span>{' '}
              {about.bio}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 24px', marginBottom: 36 }}>
              {info.map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--indigo)', flexShrink: 0 }}>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
              {about.skillGroups.map(({ label, items }) => (
                <div key={label}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: 8 }}>{label}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {items.map(item => (
                      <span key={item} style={{ padding: '3px 12px', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 600, background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {about.cvUrl ? (
                <a href={about.cvUrl} download className="btn-primary">
                  <Download size={16} /> Download CV
                </a>
              ) : null}
              <a href={`mailto:${about.email}`} className="btn-ghost">
                <ExternalLink size={16} /> Let's Talk
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
