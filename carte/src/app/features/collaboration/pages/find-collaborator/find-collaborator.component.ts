import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TalentDataService } from '../../../../core/services/talent-data.service';
import { CollaborationRequest } from '../../../../core/models/talent.model';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-find-collaborator',
  imports: [CommonModule, FormsModule, NavigationComponent],
  templateUrl: './find-collaborator.component.html',
  styleUrl: './find-collaborator.component.css'
})
export class FindCollaboratorComponent implements OnInit {
  showForm = false;
  searchQuery = '';
  filterStatus = '';
  skillsInput = '';
  
  newRequest = {
    title: '',
    description: '',
    requiredSkills: [] as string[]
  };

  allCollaborations: CollaborationRequest[] = [];
  filteredCollaborations: CollaborationRequest[] = [];

  constructor(
    private talentService: TalentDataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.talentService.getCollaborations().subscribe(collabs => {
      this.allCollaborations = collabs;
      this.filteredCollaborations = collabs;
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  submitRequest(): void {
    if (this.newRequest.title && this.newRequest.description) {
      const currentUser = this.authService.getCurrentUser();
      const skills = this.skillsInput.split(',').map(s => s.trim()).filter(s => s);
      
      const request: CollaborationRequest = {
        id: Date.now().toString(),
        title: this.newRequest.title,
        description: this.newRequest.description,
        requiredSkills: skills,
        creator: `${currentUser?.firstName || 'User'} ${currentUser?.lastName || ''}`,
        creatorId: currentUser?.email || '',
        status: 'Open',
        createdAt: new Date()
      };

      this.talentService.addCollaboration(request);
      this.resetForm();
      this.showForm = false;
    }
  }

  applyFilters(): void {
    let filtered = this.allCollaborations;

    // Filter by status
    if (this.filterStatus) {
      filtered = filtered.filter(c => c.status === this.filterStatus);
    }

    // Filter by search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.requiredSkills.some(s => s.toLowerCase().includes(query))
      );
    }

    this.filteredCollaborations = filtered;
  }

  private resetForm(): void {
    this.newRequest = {
      title: '',
      description: '',
      requiredSkills: []
    };
    this.skillsInput = '';
  }
}
