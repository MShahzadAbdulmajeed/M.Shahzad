import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Upload, Link2, Images, Check, Search, Loader2, RefreshCw } from 'lucide-react';

interface GalleryImage {
  url: string;
  name: string;
  folder: string;
}

type Tab = 'gallery' | 'upload' | 'url';

interface ImagePickerProps {
  /** Current selected URL */
  value: string;
  /** Called when the user picks/confirms an image */
  onChange: (url: string) => void;
  /** Label shown above the picker */
  label?: string;
  /** Small hint text */
  hint?: string;
  /** Show as a modal trigger or inline */
  mode?: 'modal' | 'inline';
}

/* ─── small helpers ─────────────────────────────── */
const tabBtn = (active: boolean): React.CSSProperties => ({
  display: 'flex', alignItems: 'center', gap: 6,
  padding: '8px 16px', borderRadius: 8,
  border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem',
  fontFamily: 'inherit',
  background: active ? 'var(--indigo)' : 'var(--bg-elevated)',
  color: active ? '#fff' : 'var(--text-muted)',
  boxShadow: active ? '0 2px 10px var(--indigo-glow)' : 'none',
  transition: 'all 0.15s',
});

/* ─── Main component ────────────────────────────── */
export const ImagePicker: React.FC<ImagePickerProps> = ({
  value, onChange, label, hint, mode = 'modal',
}) => {
  const [open, setOpen] = useState(false);

  if (mode === 'inline') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {label && <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</p>}
        <PickerBody value={value} onChange={onChange} onClose={() => {}} inline />
        {hint && <p style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>{hint}</p>}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</p>}

      {/* Trigger */}
      <button type="button" onClick={() => setOpen(true)}
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 12px', borderRadius: 10, cursor: 'pointer',
          background: 'var(--bg-elevated)', border: '1px solid var(--border)',
          transition: 'border-color 0.2s', textAlign: 'left', width: '100%',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--indigo)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
      >
        {value ? (
          <>
            <img src={value} alt="" style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 6, flexShrink: 0, border: '1px solid var(--border)' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{value}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--indigo)', fontWeight: 600, flexShrink: 0 }}>Change</span>
          </>
        ) : (
          <>
            <div style={{ width: 48, height: 36, borderRadius: 6, background: 'var(--bg-card)', border: '1px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Images size={16} style={{ color: 'var(--text-faint)' }} />
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-faint)' }}>Click to select an image…</span>
          </>
        )}
      </button>
      {hint && <p style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>{hint}</p>}

      {/* Modal */}
      {open && (
        <PickerModal value={value} onChange={v => { onChange(v); setOpen(false); }} onClose={() => setOpen(false)} />
      )}
    </div>
  );
};

/* ─── Modal shell ───────────────────────────────── */
const PickerModal: React.FC<{ value: string; onChange: (v: string) => void; onClose: () => void }> = ({ value, onChange, onClose }) => {
  // Close on backdrop click
  const backdropRef = useRef<HTMLDivElement>(null);
  const onBackdrop = (e: React.MouseEvent) => { if (e.target === backdropRef.current) onClose(); };

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div ref={backdropRef} onClick={onBackdrop}
      style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 760, maxHeight: '88vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-card)', borderRadius: 18, border: '1px solid var(--border)', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <p style={{ fontWeight: 800, fontSize: '1rem' }}>Select Image</p>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
        </div>
        {/* Body */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <PickerBody value={value} onChange={onChange} onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

/* ─── Picker body (shared between modal and inline) ─ */
const PickerBody: React.FC<{ value: string; onChange: (v: string) => void; onClose: () => void; inline?: boolean }> = ({
  value, onChange, onClose, inline = false,
}) => {
  const [tab, setTab] = useState<Tab>('gallery');
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryError, setGalleryError] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(value);
  const [urlInput, setUrlInput] = useState(value.startsWith('http') || value.startsWith('/') ? value : '');
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchGallery = useCallback(async () => {
    setGalleryLoading(true);
    setGalleryError('');
    try {
      const res = await fetch('/api/list-images');
      if (!res.ok) throw new Error('Failed to load gallery');
      setGallery(await res.json());
    } catch (e: any) {
      setGalleryError(e.message);
    }
    setGalleryLoading(false);
  }, []);

  useEffect(() => { if (tab === 'gallery') fetchGallery(); }, [tab, fetchGallery]);

  const uploadFile = async (file: File) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif'];
    if (!allowed.includes(file.type)) { alert('Unsupported file type. Use JPG, PNG, WebP, GIF or SVG.'); return; }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload-image', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const { url } = await res.json();
      setSelected(url);
      // Refresh gallery and switch to it
      await fetchGallery();
      setTab('gallery');
    } catch (e: any) {
      alert(e.message ?? 'Upload failed');
    }
    setUploading(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const confirm = () => {
    const final = tab === 'url' ? urlInput.trim() : selected;
    if (!final) return;
    onChange(final);
  };

  const filteredGallery = gallery.filter(img =>
    img.name.toLowerCase().includes(search.toLowerCase()) ||
    img.folder.toLowerCase().includes(search.toLowerCase())
  );

  // Group by folder
  const grouped = filteredGallery.reduce<Record<string, GalleryImage[]>>((acc, img) => {
    (acc[img.folder] ??= []).push(img);
    return acc;
  }, {});

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, padding: '14px 22px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <button style={tabBtn(tab === 'gallery')} onClick={() => setTab('gallery')}><Images size={14} />Gallery</button>
        <button style={tabBtn(tab === 'upload')} onClick={() => setTab('upload')}><Upload size={14} />Upload</button>
        <button style={tabBtn(tab === 'url')} onClick={() => setTab('url')}><Link2 size={14} />URL</button>
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '18px 22px', minHeight: 320 }}>

        {/* ── Gallery tab ── */}
        {tab === 'gallery' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Search + refresh */}
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }} />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search images…"
                  style={{ width: '100%', boxSizing: 'border-box', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px 8px 32px', color: 'var(--text-base)', fontSize: '0.82rem', outline: 'none', fontFamily: 'inherit' }} />
              </div>
              <button onClick={fetchGallery} title="Refresh"
                style={{ padding: '8px 10px', borderRadius: 8, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <RefreshCw size={14} style={{ animation: galleryLoading ? 'spin 1s linear infinite' : 'none' }} />
              </button>
            </div>

            {galleryLoading && (
              <div style={{ display: 'flex', justifyContent: 'center', padding: 40, color: 'var(--text-faint)' }}>
                <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
              </div>
            )}
            {galleryError && (
              <div style={{ padding: '12px 16px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 10, color: '#f87171', fontSize: '0.82rem' }}>
                {galleryError} — Make sure the dev server is running.
              </div>
            )}

            {!galleryLoading && !galleryError && Object.keys(grouped).length === 0 && (
              <p style={{ textAlign: 'center', color: 'var(--text-faint)', padding: 40, fontSize: '0.88rem' }}>
                No images found. Upload some first.
              </p>
            )}

            {Object.entries(grouped).map(([folder, imgs]) => (
              <div key={folder}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
                  📁 {folder} ({imgs.length})
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 8 }}>
                  {imgs.map(img => {
                    const isSelected = selected === img.url;
                    return (
                      <div key={img.url} onClick={() => setSelected(img.url)}
                        title={img.name}
                        style={{
                          position: 'relative', borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
                          border: `2px solid ${isSelected ? 'var(--indigo)' : 'transparent'}`,
                          boxShadow: isSelected ? '0 0 0 2px var(--indigo-glow)' : 'none',
                          aspectRatio: '1',
                          background: 'var(--bg-elevated)',
                          transition: 'border-color 0.15s',
                        }}>
                        <img src={img.url} alt={img.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          onError={e => { const el = e.target as HTMLImageElement; el.style.display = 'none'; }} />
                        {isSelected && (
                          <div style={{ position: 'absolute', inset: 0, background: 'rgba(99,102,241,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ background: 'var(--indigo)', borderRadius: 9999, padding: 4 }}><Check size={16} color="#fff" /></div>
                          </div>
                        )}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', padding: '3px 6px' }}>
                          <p style={{ fontSize: '0.6rem', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{img.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Upload tab ── */}
        {tab === 'upload' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${dragOver ? 'var(--indigo)' : 'var(--border)'}`,
                borderRadius: 14, padding: '48px 24px', textAlign: 'center', cursor: 'pointer',
                background: dragOver ? 'var(--indigo-dim)' : 'var(--bg-elevated)',
                transition: 'all 0.2s',
              }}>
              {uploading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, color: 'var(--indigo)' }}>
                  <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
                  <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Uploading…</p>
                </div>
              ) : (
                <>
                  <Upload size={36} style={{ color: 'var(--indigo)', marginBottom: 12, display: 'block', margin: '0 auto 12px' }} />
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-base)', marginBottom: 6 }}>
                    Drag & drop an image here
                  </p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>
                    or click to browse your computer
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>
                    Supported: JPG, PNG, WebP, GIF, SVG
                  </p>
                </>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} style={{ display: 'none' }} />
            </div>

            {selected && selected.startsWith('/uploads/images/') && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10 }}>
                <img src={selected} alt="" style={{ width: 52, height: 40, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--border)' }} />
                <div>
                  <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--emerald)' }}>✓ Uploaded successfully</p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{selected}</p>
                </div>
              </div>
            )}

            <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
              Files are saved to <code>public/uploads/images/</code> and served at the same URL.
            </p>
          </div>
        )}

        {/* ── URL tab ── */}
        {tab === 'url' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Image URL</p>
              <input
                value={urlInput}
                onChange={e => { setUrlInput(e.target.value); setSelected(e.target.value); }}
                placeholder="https://example.com/image.jpg  or  /topics/myimage.jpg"
                style={{ width: '100%', boxSizing: 'border-box', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 10, padding: '11px 14px', color: 'var(--text-base)', fontSize: '0.88rem', outline: 'none', fontFamily: 'inherit' }}
                onFocus={e => (e.target.style.borderColor = 'var(--indigo)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
            {urlInput && (
              <div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginBottom: 8 }}>Preview:</p>
                <img src={urlInput} alt="preview"
                  style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain', borderRadius: 10, border: '1px solid var(--border)', display: 'block' }}
                  onError={e => { (e.target as HTMLImageElement).alt = '⚠ Image not found'; }} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      {!inline && (
        <div style={{ padding: '14px 22px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, background: 'var(--bg-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {(tab === 'gallery' ? selected : urlInput) && (
              <>
                <img src={tab === 'gallery' ? selected : urlInput} alt=""
                  style={{ width: 36, height: 28, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--border)' }}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {tab === 'gallery' ? selected : urlInput}
                </span>
              </>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onClose} className="btn-ghost" style={{ padding: '9px 20px', fontSize: '0.85rem' }}>Cancel</button>
            <button onClick={confirm} className="btn-primary" style={{ padding: '9px 20px', fontSize: '0.85rem' }}
              disabled={!(tab === 'url' ? urlInput.trim() : selected)}>
              Use Image
            </button>
          </div>
        </div>
      )}

      {/* CSS for spin animation */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

/* ─── Multi-image picker (for gallery arrays) ─────── */
interface MultiImagePickerProps {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  hint?: string;
}

export const MultiImagePicker: React.FC<MultiImagePickerProps> = ({ value, onChange, label, hint }) => {
  const [adding, setAdding] = useState(false);

  const remove = (idx: number) => onChange(value.filter((_, i) => i !== idx));
  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const arr = [...value];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    onChange(arr);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {label && <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</p>}

      {/* Current images */}
      {value.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {value.map((url, idx) => (
            <div key={idx} style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)', width: 100, height: 76, background: 'var(--bg-elevated)', flexShrink: 0 }}>
              <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3'; }} />
              {/* Overlay controls */}
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', transition: 'background 0.15s', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', gap: 4, padding: 4 }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.5)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0)')}>
                {idx > 0 && (
                  <button onClick={() => moveUp(idx)} title="Move left"
                    style={{ width: 22, height: 22, borderRadius: 5, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    ←
                  </button>
                )}
                <button onClick={() => remove(idx)} title="Remove"
                  style={{ width: 22, height: 22, borderRadius: 5, background: 'rgba(248,113,113,0.8)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  ×
                </button>
              </div>
              {idx === 0 && (
                <div style={{ position: 'absolute', bottom: 2, left: 2, background: 'var(--indigo)', borderRadius: 4, padding: '1px 5px', fontSize: '0.55rem', color: '#fff', fontWeight: 700 }}>COVER</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add button / inline picker */}
      {adding ? (
        <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <ImagePicker value="" onChange={url => { if (url) onChange([...value, url]); setAdding(false); }} mode="inline" />
          <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
            <button onClick={() => setAdding(false)} className="btn-ghost" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>Cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAdding(true)} className="btn-ghost" style={{ alignSelf: 'flex-start', padding: '8px 16px', fontSize: '0.82rem' }}>
          + Add Image
        </button>
      )}

      {hint && <p style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>{hint}</p>}
    </div>
  );
};
