export interface Project {
  name: string;
  description: string;
}

export interface MediaItem {
  type: 'image' | 'video';
  src: string;       // image path or YouTube embed URL
  caption?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  coverImage: string;          // shown on card
  images: string[];            // gallery on detail page
  videos?: string[];           // YouTube embed URLs
  demoUrl?: string;
  githubUrl?: string;
  tags: string[];
  tools: string[];
  projects: Project[];
  description: string;
  longDescription?: string;    // richer text for detail page
}

export interface PortfolioData {
  [key: string]: SkillCategory;
}
