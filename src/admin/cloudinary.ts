/**
 * Upload an image file directly to Cloudinary using an unsigned upload preset.
 * Works from the browser — no backend needed.
 *
 * Returns the secure HTTPS URL of the uploaded image.
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      'Missing VITE_CLOUDINARY_CLOUD_NAME or VITE_CLOUDINARY_UPLOAD_PRESET in .env'
    );
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', 'portfolio'); // organise uploads in a folder

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message ?? `Cloudinary upload failed (${res.status})`);
  }

  const data = await res.json();
  return data.secure_url as string;
}

/**
 * Fetch all images from the portfolio Cloudinary folder.
 * Uses the unsigned search endpoint — requires Search API to be enabled
 * for the upload preset, OR just returns recently uploaded images.
 *
 * Falls back to an empty list (gallery only shows what was uploaded this session).
 */
export interface CloudinaryImage {
  url: string;
  publicId: string;
  name: string;
}

export async function listCloudinaryImages(): Promise<CloudinaryImage[]> {
  // Cloudinary doesn't support unauthenticated listing.
  // We return images stored in localStorage from previous uploads this session.
  const stored = localStorage.getItem('cloudinary_uploaded_images');
  if (!stored) return [];
  try {
    return JSON.parse(stored) as CloudinaryImage[];
  } catch {
    return [];
  }
}

/**
 * Persist an uploaded image URL to localStorage so the gallery can show it.
 */
export function rememberUploadedImage(img: CloudinaryImage): void {
  const existing = (() => {
    try { return JSON.parse(localStorage.getItem('cloudinary_uploaded_images') ?? '[]'); }
    catch { return []; }
  })() as CloudinaryImage[];

  // Avoid duplicates
  if (!existing.find(e => e.publicId === img.publicId)) {
    existing.unshift(img); // newest first
    localStorage.setItem('cloudinary_uploaded_images', JSON.stringify(existing.slice(0, 100)));
  }
}
