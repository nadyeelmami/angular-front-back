import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { TalentDataService } from '../../../../core/services/talent-data.service';
import { TalentProfile, CollaborationRequest } from '../../../../core/models/talent.model';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  totalTalents = 0;
  verifiedTalents = 0;
  openCollaborations = 0;
  totalSkills = 0;
  recentTalents: TalentProfile[] = [];
  recentCollaborations: CollaborationRequest[] = [];
  isAdmin = false;

  constructor(
    private talentService: TalentDataService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.isAdmin = this.authService.isAdmin();
  }

  loadDashboardData(): void {
    // Load talents
    this.talentService.getTalents().subscribe(talents => {
      this.totalTalents = talents.length;
      this.verifiedTalents = talents.filter(t => t.isVerified).length;
      this.recentTalents = talents.filter(t => t.isVerified).slice(0, 4);
      
      // Calculate unique skills
      const allSkills = talents.flatMap(t => t.skills.map(s => s.name));
      this.totalSkills = new Set(allSkills).size;
    });

    // Load collaborations
    this.talentService.getCollaborations().subscribe(collabs => {
      this.openCollaborations = collabs.filter(c => c.status === 'Open').length;
      this.recentCollaborations = collabs.slice(0, 3);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
