import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SectionsService } from '../../services/sections.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  tabSelected: string = 'categories';
  categories: Category[] = [];
  idsToDelete: string[] = [];

  constructor(public sectionsService: SectionsService) { }

  ngOnInit() {
  }

  getCategories(event) {
    this.categories.push(event);
  }

  getIdsToDelete(event) {
    this.idsToDelete.push(event);
  }

  onSave() {
    this.addCategories();
    this.deleteCategories();
  }

  private addCategories() {
    if (this.categories.length > 0) {
      this.sectionsService.addCategory(this.categories).subscribe((data: any) => {
        this.categories = [];
      });
    }
  }

  private deleteCategories() {
    if (this.idsToDelete.length > 0) {
      console.log(this.idsToDelete);
      this.sectionsService.deleteCategories(this.idsToDelete).subscribe((data: any) => {
        this.idsToDelete = [];
      });
    }
  }
}
