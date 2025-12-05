import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TalentDataService } from '../../../../core/services/talent-data.service';
import { TalentProfile } from '../../../../core/models/talent.model';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation.component';

@Component({
  selector: 'app-admin-badges',
  imports: [CommonModule, FormsModule, NavigationComponent],
  templateUrl: './admin-badges.component.html',
  styleUrl: './admin-badges.component.css'
})
export class AdminBadgesComponent implements OnInit {
  filterStatus = 'all';
  searchQuery = '';
  
  allTalents: TalentProfile[] = [];
  filteredTalents: TalentProfile[] = [];
  
  verifiedCount = 0;
  pendingCount = 0;
  totalCount = 0;

  constructor(private talentService: TalentDataService) {}

  ngOnInit(): void {
    this.talentService.getTalents().subscribe(talents => {
      this.allTalents = talents;
      this.filteredTalents = talents;
      this.calculateStats();
    });
  }

  toggleVerification(id: string): void {
    this.talentService.toggleVerification(id);
    this.calculateStats();
  }

  applyFilter(): void {
    let filtered = this.allTalents;

    // Filter by status
    if (this.filterStatus === 'verified') {
      filtered = filtered.filter(t => t.isVerified);
    } else if (this.filterStatus === 'pending') {
      filtered = filtered.filter(t => !t.isVerified);
    }

    // Filter by search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(t => 
        t.firstName.toLowerCase().includes(query) ||
        t.lastName.toLowerCase().includes(query) ||
        t.email.toLowerCase().includes(query)
      );
    }

    this.filteredTalents = filtered;
  }

  private calculateStats(): void {
    this.verifiedCount = this.allTalents.filter(t => t.isVerified).length;
    this.pendingCount = this.allTalents.filter(t => !t.isVerified).length;
    this.totalCount = this.allTalents.length;
  }
}
