import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TalentProfile, CollaborationRequest } from '../models/talent.model';

@Injectable({
  providedIn: 'root'
})
export class TalentDataService {
  private talentsSubject = new BehaviorSubject<TalentProfile[]>(this.getMockTalents());
  public talents$ = this.talentsSubject.asObservable();

  private collaborationsSubject = new BehaviorSubject<CollaborationRequest[]>(this.getMockCollaborations());
  public collaborations$ = this.collaborationsSubject.asObservable();

  constructor() {}

  // Get all talents
  getTalents(): Observable<TalentProfile[]> {
    return this.talents$;
  }

  // Get talent by ID
  getTalentById(id: string): TalentProfile | undefined {
    return this.talentsSubject.value.find(t => t.id === id);
  }

  // Search talents
  searchTalents(query: string, filters?: any): TalentProfile[] {
    const talents = this.talentsSubject.value;
    let filtered = talents;

    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(t => 
        t.firstName.toLowerCase().includes(lowerQuery) ||
        t.lastName.toLowerCase().includes(lowerQuery) ||
        t.title.toLowerCase().includes(lowerQuery) ||
        t.skills.some(s => s.name.toLowerCase().includes(lowerQuery)) ||
        t.interests.some(i => i.toLowerCase().includes(lowerQuery))
      );
    }

    if (filters?.skills && filters.skills.length > 0) {
      filtered = filtered.filter(t => 
        filters.skills.some((skill: string) => 
          t.skills.some(s => s.name.toLowerCase().includes(skill.toLowerCase()))
        )
      );
    }

    if (filters?.verified !== undefined) {
      filtered = filtered.filter(t => t.isVerified === filters.verified);
    }

    return filtered;
  }

  // Update talent
  updateTalent(id: string, updates: Partial<TalentProfile>): void {
    const talents = this.talentsSubject.value;
    const index = talents.findIndex(t => t.id === id);
    if (index !== -1) {
      talents[index] = { ...talents[index], ...updates };
      this.talentsSubject.next([...talents]);
    }
  }

  // Verify/Unverify talent
  toggleVerification(id: string): void {
    const talent = this.getTalentById(id);
    if (talent) {
      this.updateTalent(id, { isVerified: !talent.isVerified });
    }
  }

  // Collaborations
  getCollaborations(): Observable<CollaborationRequest[]> {
    return this.collaborations$;
  }

  addCollaboration(collaboration: CollaborationRequest): void {
    const current = this.collaborationsSubject.value;
    this.collaborationsSubject.next([collaboration, ...current]);
  }

  // Mock Data
  private getMockTalents(): TalentProfile[] {
    return [
      {
        id: '1',
        firstName: 'Sophie',
        lastName: 'Martin',
        email: 's.martin@cesi.fr',
        title: 'Développeuse Full-Stack',
        bio: 'Passionnée par le développement web et l\'IA, je cherche à créer des solutions innovantes pour améliorer l\'expérience utilisateur.',
        isVerified: true,
        location: 'Paris',
        availability: 'Available',
        skills: [
          { name: 'Angular', level: 'Expert', category: 'Technique' },
          { name: 'Node.js', level: 'Avancé', category: 'Technique' },
          { name: 'Python', level: 'Intermédiaire', category: 'Technique' },
          { name: 'Leadership', level: 'Avancé', category: 'Soft Skill' }
        ],
        languages: [
          { name: 'Français', level: 'Natif' },
          { name: 'Anglais', level: 'C1' },
          { name: 'Espagnol', level: 'B2' }
        ],
        interests: ['IA', 'UX Design', 'Hackathons', 'Open Source'],
        projects: [
          {
            id: 'p1',
            title: 'Plateforme E-learning',
            description: 'Application de formation en ligne avec suivi personnalisé',
            role: 'Lead Developer',
            link: 'https://github.com'
          }
        ],
        externalLinks: [
          { label: 'GitHub', url: 'https://github.com' },
          { label: 'LinkedIn', url: 'https://linkedin.com' }
        ]
      },
      {
        id: '2',
        firstName: 'Thomas',
        lastName: 'Dubois',
        email: 't.dubois@cesi.fr',
        title: 'Designer UI/UX',
        bio: 'Designer créatif avec 3 ans d\'expérience en conception d\'interfaces modernes et accessibles.',
        isVerified: true,
        location: 'Lyon',
        availability: 'Available',
        skills: [
          { name: 'Figma', level: 'Expert', category: 'Technique' },
          { name: 'Adobe XD', level: 'Avancé', category: 'Technique' },
          { name: 'Illustration', level: 'Avancé', category: 'Artistique' },
          { name: 'Communication', level: 'Expert', category: 'Soft Skill' }
        ],
        languages: [
          { name: 'Français', level: 'Natif' },
          { name: 'Anglais', level: 'B2' }
        ],
        interests: ['Design System', 'Accessibilité', 'Motion Design', 'Branding'],
        projects: [
          {
            id: 'p2',
            title: 'Application Santé Mobile',
            description: 'Design complet d\'une app de suivi santé',
            role: 'UX/UI Designer'
          }
        ],
        externalLinks: [
          { label: 'Portfolio', url: 'https://portfolio.com' },
          { label: 'Dribbble', url: 'https://dribbble.com' }
        ]
      },
      {
        id: '3',
        firstName: 'Marie',
        lastName: 'Rousseau',
        email: 'm.rousseau@cesi.fr',
        title: 'Data Scientist',
        bio: 'Experte en analyse de données et machine learning, j\'aime transformer les données en insights actionnables.',
        isVerified: false,
        location: 'Toulouse',
        availability: 'Busy',
        skills: [
          { name: 'Python', level: 'Expert', category: 'Technique' },
          { name: 'Machine Learning', level: 'Expert', category: 'Technique' },
          { name: 'SQL', level: 'Avancé', category: 'Technique' },
          { name: 'Data Visualization', level: 'Avancé', category: 'Technique' }
        ],
        languages: [
          { name: 'Français', level: 'Natif' },
          { name: 'Anglais', level: 'C2' }
        ],
        interests: ['Deep Learning', 'NLP', 'Big Data', 'Statistiques'],
        projects: [],
        externalLinks: [
          { label: 'Kaggle', url: 'https://kaggle.com' }
        ]
      },
      {
        id: '4',
        firstName: 'Lucas',
        lastName: 'Bernard',
        email: 'l.bernard@cesi.fr',
        title: 'DevOps Engineer',
        bio: 'Passionné par l\'automatisation et les infrastructures cloud. Expert en CI/CD et containerisation.',
        isVerified: true,
        location: 'Nantes',
        availability: 'Available',
        skills: [
          { name: 'Docker', level: 'Expert', category: 'Technique' },
          { name: 'Kubernetes', level: 'Avancé', category: 'Technique' },
          { name: 'AWS', level: 'Avancé', category: 'Technique' },
          { name: 'CI/CD', level: 'Expert', category: 'Technique' }
        ],
        languages: [
          { name: 'Français', level: 'Natif' },
          { name: 'Anglais', level: 'B2' }
        ],
        interests: ['Cloud', 'Automation', 'Security', 'Infrastructure as Code'],
        projects: [
          {
            id: 'p4',
            title: 'Pipeline CI/CD Complet',
            description: 'Mise en place d\'une infrastructure complète avec Jenkins et Kubernetes',
            role: 'DevOps Lead'
          }
        ],
        externalLinks: [
          { label: 'GitHub', url: 'https://github.com' }
        ]
      },
      {
        id: '5',
        firstName: 'Emma',
        lastName: 'Petit',
        email: 'e.petit@cesi.fr',
        title: 'Chef de Projet Digital',
        bio: 'Gestionnaire de projets digitaux avec forte expertise en méthodologie agile et gestion d\'équipe.',
        isVerified: false,
        location: 'Bordeaux',
        availability: 'Available',
        skills: [
          { name: 'Scrum', level: 'Expert', category: 'Soft Skill' },
          { name: 'Gestion de projet', level: 'Expert', category: 'Soft Skill' },
          { name: 'Jira', level: 'Avancé', category: 'Technique' },
          { name: 'Communication', level: 'Expert', category: 'Soft Skill' }
        ],
        languages: [
          { name: 'Français', level: 'Natif' },
          { name: 'Anglais', level: 'C1' },
          { name: 'Allemand', level: 'B1' }
        ],
        interests: ['Agile', 'Innovation', 'Lean Management', 'Product Design'],
        projects: [],
        externalLinks: [
          { label: 'LinkedIn', url: 'https://linkedin.com' }
        ]
      },
      {
        id: '6',
        firstName: 'Alexandre',
        lastName: 'Leroy',
        email: 'a.leroy@cesi.fr',
        title: 'Développeur Mobile',
        bio: 'Spécialiste du développement mobile cross-platform avec React Native et Flutter.',
        isVerified: true,
        location: 'Lille',
        availability: 'Available',
        skills: [
          { name: 'React Native', level: 'Expert', category: 'Technique' },
          { name: 'Flutter', level: 'Avancé', category: 'Technique' },
          { name: 'iOS', level: 'Intermédiaire', category: 'Technique' },
          { name: 'Android', level: 'Avancé', category: 'Technique' }
        ],
        languages: [
          { name: 'Français', level: 'Natif' },
          { name: 'Anglais', level: 'B2' }
        ],
        interests: ['Mobile Dev', 'AR/VR', 'Gaming', 'Performance'],
        projects: [
          {
            id: 'p6',
            title: 'App Fitness Tracker',
            description: 'Application mobile de suivi sportif avec gamification',
            role: 'Mobile Developer',
            link: 'https://github.com'
          }
        ],
        externalLinks: [
          { label: 'GitHub', url: 'https://github.com' },
          { label: 'Portfolio', url: 'https://portfolio.com' }
        ]
      }
    ];
  }

  private getMockCollaborations(): CollaborationRequest[] {
    return [
      {
        id: 'c1',
        title: 'Recherche développeur Back-End pour API REST',
        description: 'Nous cherchons un développeur Back-End pour créer une API REST robuste pour notre plateforme.',
        requiredSkills: ['Node.js', 'Express', 'MongoDB'],
        creator: 'Sophie Martin',
        creatorId: '1',
        status: 'Open',
        createdAt: new Date('2024-12-01')
      },
      {
        id: 'c2',
        title: 'Besoin d\'un designer pour refonte UI',
        description: 'Projet de refonte complète de l\'interface utilisateur d\'une application mobile.',
        requiredSkills: ['Figma', 'UI Design', 'Mobile Design'],
        creator: 'Lucas Bernard',
        creatorId: '4',
        status: 'Open',
        createdAt: new Date('2024-12-02')
      },
      {
        id: 'c3',
        title: 'Collaboration pour projet IA',
        description: 'Développement d\'un modèle de machine learning pour la reconnaissance d\'images.',
        requiredSkills: ['Python', 'TensorFlow', 'Machine Learning'],
        creator: 'Marie Rousseau',
        creatorId: '3',
        status: 'In Progress',
        createdAt: new Date('2024-11-28')
      },
      {
        id: 'c4',
        title: 'Hackathon - Équipe recherche développeur Full-Stack',
        description: 'Participation au hackathon national, cherchons développeur Full-Stack motivé!',
        requiredSkills: ['JavaScript', 'React', 'Node.js'],
        creator: 'Thomas Dubois',
        creatorId: '2',
        status: 'Open',
        createdAt: new Date('2024-12-03')
      }
    ];
  }
}
