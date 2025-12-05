import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// --- Interfaces (à mettre dans models/user.model.ts) ---
interface Skill {
  name: string;
  level: string;
  category: string;
}

interface Language {
  name: string;
  level: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  link?: string;
}

interface UserProfile {
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
  externalLinks: { label: string; url: string }[];
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  // Données du profil (Mock initial)
  userProfile: UserProfile = {
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'j.dupont@cesi.fr',
    title: 'Étudiant Ingénieur',
    bio: '',
    isVerified: true,
    skills: [
      { name: 'Angular', level: 'Expert', category: 'Technique' },
      { name: 'TypeScript', level: 'Avancé', category: 'Technique' }
    ],
    languages: [{ name: 'Français', level: 'Natif' }],
    interests: ['Hackathon', 'IA'],
    projects: [],
    externalLinks: [{ label: 'GitHub', url: 'https://github.com' }]
  };

  // Listes de choix
  skillCategories = ['Technique', 'Soft Skill', 'Artistique', 'Autre'];
  skillLevels = ['Débutant', 'Intermédiaire', 'Expert'];
  languageLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Natif'];

  // Champs temporaires pour les formulaires
  newSkillName = '';
  newSkillCat = 'Technique';
  newSkillLevel = 'Intermédiaire';

  newLangName = '';
  newLangLevel = 'B2';

  newInterest = '';
  
  newLinkLabel = '';
  newLinkUrl = '';

  showProjectForm = false;
  tempProject: Partial<Project> = {};

  isAiLoading = false;

  constructor() {}

  // --- Méthodes ---

  addSkill() {
    if (this.newSkillName.trim()) {
      this.userProfile.skills.push({
        name: this.newSkillName,
        category: this.newSkillCat,
        level: this.newSkillLevel
      });
      this.newSkillName = '';
    }
  }

  removeSkill(index: number) {
    this.userProfile.skills.splice(index, 1);
  }

  addLanguage() {
    if (this.newLangName.trim()) {
      this.userProfile.languages.push({
        name: this.newLangName,
        level: this.newLangLevel
      });
      this.newLangName = '';
    }
  }

  removeLanguage(index: number) {
    this.userProfile.languages.splice(index, 1);
  }

  addInterest() {
    if (this.newInterest.trim()) {
      this.userProfile.interests.push(this.newInterest);
      this.newInterest = '';
    }
  }

  removeInterest(index: number) {
    this.userProfile.interests.splice(index, 1);
  }

  addLink() {
    if (this.newLinkLabel && this.newLinkUrl) {
      this.userProfile.externalLinks.push({
        label: this.newLinkLabel,
        url: this.newLinkUrl
      });
      this.newLinkLabel = '';
      this.newLinkUrl = '';
    }
  }

  removeLink(index: number) {
    this.userProfile.externalLinks.splice(index, 1);
  }

  toggleProjectForm() {
    this.showProjectForm = !this.showProjectForm;
    this.tempProject = {};
  }

  saveProject() {
    if (this.tempProject.title && this.tempProject.description) {
      this.userProfile.projects.push({
        id: Date.now().toString(),
        title: this.tempProject.title,
        description: this.tempProject.description,
        role: this.tempProject.role || '',
        link: this.tempProject.link
      });
      this.toggleProjectForm();
    }
  }

  removeProject(id: string) {
    this.userProfile.projects = this.userProfile.projects.filter(p => p.id !== id);
  }

  // Simulation Appel IA
  async generateBio() {
    this.isAiLoading = true;
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 2000));
    
  this.userProfile.bio = `Passionné par ${this.userProfile.skills[0]?.name || 'la tech'} et fort d'une expérience en tant que ${this.userProfile.title}, je cherche à relever le défi national avec créativité et rigueur.`;

    this.isAiLoading = false;
  }
}