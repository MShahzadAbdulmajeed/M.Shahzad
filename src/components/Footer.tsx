import React from 'react';
import { Code2, Mail, ChevronUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '56px 0 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24, marginBottom: 40 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--indigo)', fontWeight: 800, fontSize: '1.1rem', marginBottom: 8 }}>
              <Code2 size={22} />
              M.Shahzad
            </div>
            <p style={{ color: 'var(--text-faint)', fontSize: '0.82rem', maxWidth: 240, lineHeight: 1.6 }}>
              Building intelligent solutions for the next generation of web applications.
            </p>
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { href: 'https://github.com/MShahzadAbdulmajeed', icon: <GithubIcon className="w-4 h-4" /> },
              { href: 'https://www.linkedin.com/in/shahzad-abdulmajeed-618887220/', icon: <LinkedinIcon className="w-4 h-4" /> },
              { href: 'mailto:shahzad.abdulmajeed4894@gmail.com', icon: <Mail size={16} /> },
            ].map(({ href, icon }) => (
              <a key={href} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-faint)', transition: 'all 0.2s', textDecoration: 'none',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'var(--indigo)'; el.style.color = 'var(--indigo)'; el.style.boxShadow = '0 0 12px var(--indigo-glow)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text-faint)'; el.style.boxShadow = 'none'; }}
              >{icon}</a>
            ))}
          </div>

          {/* Scroll to top */}
          <button onClick={scrollToTop}
            style={{
              width: 40, height: 40, borderRadius: 10, cursor: 'pointer',
              background: 'var(--indigo-dim)', border: '1px solid rgba(99,102,241,0.2)',
              color: 'var(--indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--indigo)'; el.style.color = '#fff'; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'var(--indigo-dim)'; el.style.color = 'var(--indigo)'; }}
          >
            <ChevronUp size={18} />
          </button>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, textAlign: 'center', color: 'var(--text-faint)', fontSize: '0.78rem' }}>
          © {new Date().getFullYear()} M.Shahzad · All rights reserved · Built with React & Tailwind
        </div>
      </div>
    </footer>
  );
};

export default Footer;
