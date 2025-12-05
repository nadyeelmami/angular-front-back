import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TalentDataService } from '../../../../core/services/talent-data.service';
import { TalentProfile } from '../../../../core/models/talent.model';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation.component';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, NavigationComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchQuery = '';
  filterVerified: boolean | undefined = undefined;
  filterAvailability = '';
  skillFilter = '';
  viewMode: 'grid' | 'list' = 'grid';
  
  allTalents: TalentProfile[] = [];
  filteredTalents: TalentProfile[] = [];

  constructor(private talentService: TalentDataService) {}

  ngOnInit(): void {
    this.talentService.getTalents().subscribe(talents => {
      this.allTalents = talents;
      this.filteredTalents = talents;
    });
  }

  onSearch(): void {
    const filters: any = {};
    
    if (this.filterVerified !== undefined) {
      filters.verified = this.filterVerified;
    }
    
    if (this.skillFilter) {
      filters.skills = [this.skillFilter];
    }

    this.filteredTalents = this.talentService.searchTalents(this.searchQuery, filters);

    // Filter by availability
    if (this.filterAvailability) {
      this.filteredTalents = this.filteredTalents.filter(
        t => t.availability === this.filterAvailability
      );
    }
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.filterVerified = undefined;
    this.filterAvailability = '';
    this.skillFilter = '';
    this.filteredTalents = this.allTalents;
  }
}
