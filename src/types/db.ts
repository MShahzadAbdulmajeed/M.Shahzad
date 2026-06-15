export interface Implementation {
  name: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  icon: string;
  category: string;
  coverImage: string;
  images: string[];
  videos: string[];
  demoUrl: string;
  githubUrl: string;
  tags: string[];
  tools: string[];
  description: string;
  longDescription: string;
  implementations: Implementation[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface About {
  photo: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  cvUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  skillGroups: SkillGroup[];
}

export interface Hero {
  name: string;
  badge: string;
  roles: string[];
  description: string;
  highlightWords: string[];
}

export interface Category {
  id: string;
  name: string;
}

export interface DB {
  hero: Hero;
  about: About;
  categories: Category[];
  projects: Project[];
}
