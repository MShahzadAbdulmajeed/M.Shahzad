import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Cpu, Brain, Laptop, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

const navLinks = [
  { name: 'Object Detection', icon: <Cpu size={15} />, href: '#object-detection' },
  { name: 'NLP',              icon: <Brain size={15} />, href: '#nlp' },
  { name: 'Web Dev',          icon: <Laptop size={15} />, href: '#web-dev' },
  { name: 'About',            icon: <Code2 size={15} />,  href: '#about' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    transition: 'all 0.3s',
    padding: scrolled ? '14px 0' : '22px 0',
    background: scrolled ? 'rgba(3,7,18,0.85)' : 'transparent',
    backdropFilter: scrolled ? 'blur(14px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
  };

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Logo */}
        <motion.a href="/" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: '1.1rem', color: 'var(--indigo)', textDecoration: 'none' }}
          className="glow-text"
        >
          <Code2 size={26} />
          M.Shahzad
        </motion.a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden md:flex">
          {navLinks.map((link, i) => (
            <motion.a key={link.name} href={link.href}
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: '0.875rem', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--indigo)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link.icon}{link.name}
            </motion.a>
          ))}

          <div style={{ display: 'flex', gap: 16, paddingLeft: 24, borderLeft: '1px solid var(--border)' }}>
            {[
              { href: 'https://github.com/MShahzadAbdulmajeed', icon: <GithubIcon className="w-5 h-5" /> },
              { href: 'https://www.linkedin.com/in/shahzad-abdulmajeed-618887220/', icon: <LinkedinIcon className="w-5 h-5" /> },
            ].map(({ href, icon }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--text-faint)', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--indigo)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-faint)')}
              >{icon}</a>
            ))}
          </div>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden"
          style={{ background: 'none', border: 'none', color: 'var(--text-base)', cursor: 'pointer' }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}
            className="md:hidden"
          >
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {navLinks.map(link => (
                <a key={link.name} href={link.href} onClick={() => setOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', padding: '8px 0' }}>
                  {link.icon}{link.name}
                </a>
              ))}
              <div style={{ display: 'flex', gap: 16, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                <a href="https://github.com/MShahzadAbdulmajeed" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-faint)' }}><GithubIcon className="w-5 h-5" /></a>
                <a href="https://www.linkedin.com/in/shahzad-abdulmajeed-618887220/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-faint)' }}><LinkedinIcon className="w-5 h-5" /></a>
                <a href="mailto:shahzad.abdulmajeed4894@gmail.com" style={{ color: 'var(--text-faint)' }}><Mail size={20} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
