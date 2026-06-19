import React, { useState, useEffect } from 'react';
import { Menu, X, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubIcon, LinkedinIcon, HuggingFaceIcon } from './SocialIcons';
import { SocialLink } from './SocialLink';
import { useDB } from '../hooks/useDB';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { data } = useDB();
  const about = data?.about;
  const categories = data?.categories ?? [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Nav links built from categories (skip "all")
  const navLinks = categories
    .filter(c => c.id !== 'all')
    .map(c => ({ name: c.name, href: `#${c.id}` }));
  navLinks.push({ name: 'About', href: '#about' });

  const socials = [
    about?.githubUrl      && { href: about.githubUrl,      icon: <GithubIcon className="w-4 h-4" />,      label: 'GitHub' },
    about?.linkedinUrl    && { href: about.linkedinUrl,    icon: <LinkedinIcon className="w-4 h-4" />,     label: 'LinkedIn' },
    about?.huggingfaceUrl && { href: about.huggingfaceUrl, icon: <HuggingFaceIcon className="w-4 h-4" />, label: 'HuggingFace' },
  ].filter(Boolean) as { href: string; icon: React.ReactNode; label: string }[];

  const navStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    transition: 'all 0.3s',
    padding: scrolled ? '12px 0' : '20px 0',
    background: scrolled ? 'rgba(3,7,18,0.88)' : 'transparent',
    backdropFilter: scrolled ? 'blur(16px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
  };

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Logo — profile photo + name */}
        <motion.a href="/" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, borderRadius: 9999, overflow: 'hidden', border: '2px solid var(--indigo)', flexShrink: 0 }}>
            {about?.photo && (
              <img
                src={about.photo}
                alt={data?.hero?.name ?? 'M.Shahzad'}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            )}
          </div>
          <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--indigo)' }} className="glow-text nav-name">
            M.Shahzad
          </span>
        </motion.a>

        {/* Desktop nav — hidden on mobile */}
        <div style={{ alignItems: 'center', gap: 28 }} className="desktop-nav">
          {navLinks.map((link, i) => (
            <motion.a key={link.name} href={link.href}
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: '0.875rem', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--indigo)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
              {link.name}
            </motion.a>
          ))}

          <div style={{ display: 'flex', gap: 10, paddingLeft: 20, borderLeft: '1px solid var(--border)', alignItems: 'center' }}>
            {socials.map(({ href, icon, label }) => (
              <SocialLink key={href} href={href} icon={icon} label={label} size={34} tooltipDir="down" />
            ))}
          </div>
        </div>

        {/* Mobile toggle — only visible on small screens */}
        <button onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', color: 'var(--text-base)', cursor: 'pointer', display: 'flex' }}
          className="mobile-menu-btn">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}
            className="mobile-menu">
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {navLinks.map(link => (
                <a key={link.name} href={link.href} onClick={() => setOpen(false)}
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  {link.name}
                </a>
              ))}
              <div style={{ display: 'flex', gap: 16, paddingTop: 16 }}>
                {socials.map(({ href, icon, label }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    style={{ color: 'var(--text-faint)', display: 'flex' }}>
                    {icon}
                  </a>
                ))}
                {about?.email && (
                  <a href={`mailto:${about.email}`} style={{ color: 'var(--text-faint)', display: 'flex' }}>
                    <Mail size={18} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
