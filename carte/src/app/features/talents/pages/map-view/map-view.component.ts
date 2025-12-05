import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TalentDataService } from '../../../../core/services/talent-data.service';
import { TalentProfile } from '../../../../core/models/talent.model';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation.component';

@Component({
  selector: 'app-map-view',
  imports: [CommonModule, NavigationComponent],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements OnInit {
  viewType: 'map' | 'network' = 'map';
  allTalents: TalentProfile[] = [];
  skillsCloud: any[] = [];
  locations: any[] = [];
  stats = {
    totalTalents: 0,
    totalSkills: 0,
    totalLocations: 0,
    totalLanguages: 0
  };
  topSkills: any[] = [];

  constructor(private talentService: TalentDataService) {}

  ngOnInit(): void {
    this.talentService.getTalents().subscribe(talents => {
      this.allTalents = talents;
      this.generateSkillsCloud(talents);
      this.generateLocations(talents);
      this.calculateStats(talents);
      this.generateTopSkills(talents);
    });
  }

  private generateSkillsCloud(talents: TalentProfile[]): void {
    const skillsMap = new Map<string, number>();
    talents.forEach(t => {
      t.skills.forEach(s => {
        skillsMap.set(s.name, (skillsMap.get(s.name) || 0) + 1);
      });
    });

    const maxCount = Math.max(...Array.from(skillsMap.values()));
    this.skillsCloud = Array.from(skillsMap.entries()).map(([name, count]) => ({
      name,
      count,
      size: 16 + (count / maxCount) * 32,
      opacity: 0.6 + (count / maxCount) * 0.4
    }));
  }

  private generateLocations(talents: TalentProfile[]): void {
    const locationsMap = new Map<string, TalentProfile[]>();
    talents.forEach(t => {
      if (t.location) {
        const existing = locationsMap.get(t.location) || [];
        existing.push(t);
        locationsMap.set(t.location, existing);
      }
    });

    this.locations = Array.from(locationsMap.entries()).map(([city, talents]) => ({
      city,
      count: talents.length,
      talents
    }));
  }

  private calculateStats(talents: TalentProfile[]): void {
    this.stats.totalTalents = talents.length;
    const allSkills = talents.flatMap(t => t.skills.map(s => s.name));
    this.stats.totalSkills = new Set(allSkills).size;
    this.stats.totalLocations = new Set(talents.map(t => t.location).filter(l => l)).size;
    const allLanguages = talents.flatMap(t => t.languages.map(l => l.name));
    this.stats.totalLanguages = new Set(allLanguages).size;
  }

  private generateTopSkills(talents: TalentProfile[]): void {
    const skillsMap = new Map<string, number>();
    talents.forEach(t => {
      t.skills.forEach(s => {
        skillsMap.set(s.name, (skillsMap.get(s.name) || 0) + 1);
      });
    });

    const totalTalents = talents.length;
    this.topSkills = Array.from(skillsMap.entries())
      .map(([name, count]) => ({
        name,
        count,
        percentage: (count / totalTalents) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }
}
