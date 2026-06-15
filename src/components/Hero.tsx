import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Sparkles, Rocket, ArrowDown } from 'lucide-react';
import { useDB } from '../hooks/useDB';

const Hero: React.FC = () => {
  const { data } = useDB();
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = data?.hero.roles ?? ['Full-Stack AI Engineer'];

  useEffect(() => {
    const id = setInterval(() => setRoleIndex(p => (p + 1) % roles.length), 3200);
    return () => clearInterval(id);
  }, [roles.length]);

  const hero = data?.hero;

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: 80 }}>
      <div className="orb" style={{ width: 520, height: 520, top: '10%', left: '5%', background: 'var(--indigo)', animationDelay: '0s' }} />
      <div className="orb" style={{ width: 440, height: 440, bottom: '10%', right: '5%', background: 'var(--emerald)', animationDelay: '4s' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03, backgroundImage: 'linear-gradient(var(--text-base) 1px, transparent 1px), linear-gradient(90deg, var(--text-base) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 9999, border: '1px solid rgba(99,102,241,0.35)', background: 'rgba(99,102,241,0.08)', color: 'var(--indigo)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 32 }}>
          <Sparkles size={14} />
          {hero?.badge ?? 'Open for new AI opportunities'}
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 20 }}>
          Hi, I'm <span className="grad-text glow-text">{hero?.name ?? 'Shahzad'}</span>
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ height: 52, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 28, overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.p key={roleIndex}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
              style={{ fontSize: 'clamp(1.2rem, 3.2vw, 1.9rem)', color: 'var(--text-muted)', fontWeight: 600 }}>
              {roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: 620, margin: '0 auto 44px', lineHeight: 1.75 }}>
          {hero ? hero.description.split(' ').map((word, i) => {
            const highlighted = hero.highlightWords.some(hw => hw.split(' ').includes(word));
            return <span key={i} style={highlighted ? { color: 'var(--text-base)', fontWeight: 600 } : {}}>{word} </span>;
          }) : 'Architecting the future with AI.'}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <a href="#projects" className="btn-primary"><Rocket size={18} />View My Work</a>
          <a href="#about" className="btn-ghost"><Terminal size={18} />About Me</a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          style={{ marginTop: 72, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'var(--text-faint)', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
          <span>SCROLL</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}><ArrowDown size={16} /></motion.div>
        </motion.div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, var(--bg), transparent)' }} />
    </section>
  );
};

export default Hero;
