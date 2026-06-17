import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, User, Download, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon, HuggingFaceIcon } from './SocialIcons';
import { SocialLink } from './SocialLink';
import { useDB } from '../hooks/useDB';

const About: React.FC = () => {
  const { data } = useDB();
  const about = data?.about;
  if (!about) return null;

  const contactItems = [
    { icon: <Mail size={15} />,    label: about.email,        href: `mailto:${about.email}` },
    { icon: <Phone size={15} />,   label: about.phone,        href: `tel:${about.phone}` },
    { icon: <MapPin size={15} />,  label: about.location,     href: null },
    { icon: <User size={15} />,    label: about.availability, href: null },
  ];

  const socials = [
    about.githubUrl      && { href: about.githubUrl,      icon: <GithubIcon className="w-4 h-4" />,       label: 'GitHub' },
    about.linkedinUrl    && { href: about.linkedinUrl,    icon: <LinkedinIcon className="w-4 h-4" />,      label: 'LinkedIn' },
    about.huggingfaceUrl && { href: about.huggingfaceUrl, icon: <HuggingFaceIcon className="w-4 h-4" />,  label: 'HuggingFace' },
  ].filter(Boolean) as { href: string; icon: React.ReactNode; label: string }[];

  return (
    <section id="about" style={{ padding: '96px 0', background: 'var(--bg-elevated)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Section label */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 60 }}>
          <span className="section-label">✦ Who I Am</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, textAlign: 'center' }}>
            About <span className="grad-text">Me</span>
          </h2>
        </div>

        <div className="about-grid">

          {/* Photo column */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <div className="about-photo-wrap">
              <div style={{ position: 'absolute', inset: -3, borderRadius: 22, background: 'linear-gradient(135deg, var(--indigo), var(--emerald))', filter: 'blur(22px)', opacity: 0.3 }} />
              <div style={{ position: 'relative', background: 'var(--bg-card)', borderRadius: 20, padding: 6, border: '1px solid var(--border)' }}>
                <img src={about.photo} alt="M.Shahzad"
                  style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 16, display: 'block', transition: 'filter 0.5s', filter: 'grayscale(15%)' }}
                  onMouseEnter={e => ((e.target as HTMLImageElement).style.filter = 'grayscale(0%)')}
                  onMouseLeave={e => ((e.target as HTMLImageElement).style.filter = 'grayscale(15%)')}
                  onError={e => { (e.target as HTMLImageElement).src = '/shahzad_image.jpg'; }}
                />
              </div>

              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3.5, repeat: Infinity }}
                className="about-badge-right"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 20px', boxShadow: '0 8px 32px rgba(0,0,0,0.45)', textAlign: 'center', minWidth: 90 }}>
                <p style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--indigo)', lineHeight: 1 }}>{about.yearsExp || '2'}+</p>
                <p style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-faint)', marginTop: 4 }}>Years Exp.</p>
              </motion.div>

              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="about-badge-left"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 20px', boxShadow: '0 8px 32px rgba(0,0,0,0.45)', textAlign: 'center', minWidth: 90 }}>
                <p style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--emerald)', lineHeight: 1 }}>
                  {about.projectsCount || data?.projects.length || 9}+
                </p>
                <p style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-faint)', marginTop: 4 }}>Projects</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Info column */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 6 }}>{about.title}</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: 32 }}>{about.bio}</p>

            {/* Contact grid */}
            <div className="about-contact-grid">
              {contactItems.map(({ icon, label, href }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--indigo)', flexShrink: 0 }}>{icon}</span>
                  {href
                    ? <a href={href} style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--indigo)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>{label}</a>
                    : <span>{label}</span>
                  }
                </div>
              ))}
            </div>

            {/* Skills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
              {about.skillGroups.map(({ label, items }) => (
                <div key={label}>
                  <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: 8 }}>{label}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {items.map(item => (
                      <span key={item} style={{ padding: '3px 11px', borderRadius: 9999, fontSize: '0.73rem', fontWeight: 600, background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials + CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              {about.cvUrl && (
                <a href={about.cvUrl} download className="btn-primary" style={{ fontSize: '0.88rem', padding: '10px 22px' }}>
                  <Download size={15} /> Download CV
                </a>
              )}
              <a href={`mailto:${about.email}`} className="btn-ghost" style={{ fontSize: '0.88rem', padding: '10px 22px' }}>
                <ExternalLink size={15} /> Let's Talk
              </a>
              {socials.map(({ href, icon, label }) => (
                <SocialLink key={href} href={href} icon={icon} label={label} size={38} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
