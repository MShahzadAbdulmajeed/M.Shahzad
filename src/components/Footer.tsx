import React from 'react';
import { Mail, ChevronUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, HuggingFaceIcon } from './SocialIcons';
import { SocialLink } from './SocialLink';
import { useDB } from '../hooks/useDB';

const Footer: React.FC = () => {
  const { data } = useDB();
  const about = data?.about;

  const socials = [
    about?.githubUrl      && { href: about.githubUrl,      icon: <GithubIcon className="w-4 h-4" />,      label: 'GitHub' },
    about?.linkedinUrl    && { href: about.linkedinUrl,    icon: <LinkedinIcon className="w-4 h-4" />,     label: 'LinkedIn' },
    about?.huggingfaceUrl && { href: about.huggingfaceUrl, icon: <HuggingFaceIcon className="w-4 h-4" />, label: 'HuggingFace' },
    about?.email          && { href: `mailto:${about.email}`, icon: <Mail size={16} />,                   label: 'Email' },
  ].filter(Boolean) as { href: string; icon: React.ReactNode; label: string }[];

  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '52px 0 28px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div className="footer-inner">

          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 9999, overflow: 'hidden', border: '2px solid var(--indigo)', flexShrink: 0 }}>
              <img src={about?.photo ?? '/shahzad_image.jpg'} alt="M.Shahzad"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={e => { (e.target as HTMLImageElement).src = '/shahzad_image.jpg'; }} />
            </div>
            <div>
              <p style={{ fontWeight: 800, color: 'var(--indigo)', fontSize: '1rem' }}>M.Shahzad</p>
              <p style={{ color: 'var(--text-faint)', fontSize: '0.75rem' }}>{about?.title ?? 'Full-Stack AI Engineer'}</p>
            </div>
          </div>

          {/* Socials */}
          <div style={{ display: 'flex', gap: 10 }}>
            {socials.map(({ href, icon, label }) => (
              <SocialLink key={href} href={href} icon={icon} label={label} size={38} />
            ))}
          </div>

          {/* Scroll to top */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ width: 40, height: 40, borderRadius: 10, cursor: 'pointer', background: 'var(--indigo-dim)', border: '1px solid rgba(99,102,241,0.2)', color: 'var(--indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--indigo)'; el.style.color = '#fff'; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'var(--indigo-dim)'; el.style.color = 'var(--indigo)'; }}>
            <ChevronUp size={18} />
          </button>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 22, textAlign: 'center', color: 'var(--text-faint)', fontSize: '0.75rem' }}>
          © {new Date().getFullYear()} M.Shahzad · All rights reserved · Built with React
        </div>
      </div>
    </footer>
  );
};

export default Footer;
