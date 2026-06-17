import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Mail, Sparkles, ArrowDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon, HuggingFaceIcon } from './SocialIcons';
import { SocialLink } from './SocialLink';
import { useDB } from '../hooks/useDB';

const Hero: React.FC = () => {
  const { data } = useDB();
  const [roleIndex, setRoleIndex] = useState(0);
  const hero  = data?.hero;
  const about = data?.about;
  const roles = hero?.roles ?? ['Full-Stack AI Engineer'];

  useEffect(() => {
    const id = setInterval(() => setRoleIndex(p => (p + 1) % roles.length), 3200);
    return () => clearInterval(id);
  }, [roles.length]);

  const socials = [
    about?.githubUrl      && { href: about.githubUrl,      icon: <GithubIcon className="w-5 h-5" />,      label: 'GitHub' },
    about?.linkedinUrl    && { href: about.linkedinUrl,    icon: <LinkedinIcon className="w-5 h-5" />,     label: 'LinkedIn' },
    about?.huggingfaceUrl && { href: about.huggingfaceUrl, icon: <HuggingFaceIcon className="w-5 h-5" />, label: 'HuggingFace' },
  ].filter(Boolean) as { href: string; icon: React.ReactNode; label: string }[];

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 80, paddingBottom: 40 }}>
      {/* Background */}
      <div className="orb" style={{ width: 600, height: 600, top: '-10%', right: '-5%', background: 'var(--indigo)', animationDelay: '0s', opacity: 0.12 }} />
      <div className="orb" style={{ width: 400, height: 400, bottom: '5%', left: '-5%', background: 'var(--emerald)', animationDelay: '3s', opacity: 0.1 }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.025, backgroundImage: 'linear-gradient(var(--text-base) 1px,transparent 1px),linear-gradient(90deg,var(--text-base) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%', position: 'relative', zIndex: 10 }}>
        <div className="hero-grid">

          {/* ── Left: Text ── */}
          <div>
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 9999, border: '1px solid rgba(99,102,241,0.35)', background: 'rgba(99,102,241,0.08)', color: 'var(--indigo)', fontSize: '0.78rem', fontWeight: 600, marginBottom: 28 }}>
              <Sparkles size={13} />
              {hero?.badge ?? 'Open for new AI opportunities'}
            </motion.div>

            {/* Name */}
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
              style={{ fontSize: 'clamp(2.6rem, 5vw, 4.4rem)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: 18 }}>
              Hi, I'm{' '}
              <span className="grad-text glow-text">{hero?.name ?? 'Shahzad'}</span>
            </motion.h1>

            {/* Animated role */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
              style={{ height: 44, overflow: 'hidden', marginBottom: 24 }}>
              <AnimatePresence mode="wait">
                <motion.p key={roleIndex}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.55rem)', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {roles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Description */}
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
              style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 40, maxWidth: 540 }}>
              {hero ? hero.description.split(' ').map((word, i) => {
                const hi = hero.highlightWords.some(hw => hw.split(' ').includes(word));
                return <span key={i} style={hi ? { color: 'var(--text-base)', fontWeight: 700 } : {}}>{word} </span>;
              }) : null}
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 44 }}>
              <a href="#projects" className="btn-primary">View My Work</a>
              {about?.cvUrl
                ? <a href={about.cvUrl} download className="btn-ghost"><Download size={16} />Download CV</a>
                : <a href="#about" className="btn-ghost"><Mail size={16} />Contact Me</a>
              }
            </motion.div>

            {/* Socials */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              {socials.map(({ href, icon, label }) => (
                <SocialLink key={href} href={href} icon={icon} label={label} size={40} />
              ))}
              {about?.email && (
                <a href={`mailto:${about.email}`} className="hero-email"
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--indigo)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  {about.email}
                </a>
              )}
            </motion.div>
          </div>

          {/* ── Right: Photo ── */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
            style={{ position: 'relative' }} className="hero-photo-col">
            {/* Glow ring */}
            <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: 'linear-gradient(135deg, var(--indigo), var(--emerald))', filter: 'blur(20px)', opacity: 0.35 }} />
            {/* Photo */}
            <div style={{ position: 'relative', borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(99,102,241,0.4)', aspectRatio: '1', background: 'var(--bg-card)' }}>
              <img
                src={about?.photo ?? '/shahzad_image.jpg'}
                alt={hero?.name ?? 'M.Shahzad'}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.04)')}
                onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
                onError={e => { (e.target as HTMLImageElement).src = '/shahzad_image.jpg'; }}
              />
            </div>
            {/* Availability badge */}
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }}
              style={{ position: 'absolute', bottom: 24, right: -16, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
              <div style={{ width: 8, height: 8, borderRadius: 9999, background: 'var(--emerald)', boxShadow: '0 0 8px var(--emerald)' }} />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-base)', whiteSpace: 'nowrap' }}>
                {about?.availability ?? 'Available for Freelance'}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          style={{ marginTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, color: 'var(--text-faint)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          <span>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 140, background: 'linear-gradient(to top, var(--bg), transparent)', pointerEvents: 'none' }} />
    </section>
  );
};

export default Hero;
