export interface Skill {
  name: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  category: 'Technique' | 'Soft Skill' | 'Artistique' | 'Autre';
}

export interface Language {
  name: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Natif';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  link?: string;
}

export interface ExternalLink {
  label: string;
  url: string;
}

export interface TalentProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  bio: string;
  isVerified: boolean;
  skills: Skill[];
  languages: Language[];
  interests: string[];
  projects: Project[];
  externalLinks: ExternalLink[];
  location?: string;
  availability?: 'Available' | 'Busy' | 'Not Available';
  avatar?: string;
}

export interface CollaborationRequest {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  creator: string;
  creatorId: string;
  status: 'Open' | 'In Progress' | 'Closed';
  createdAt: Date;
}
