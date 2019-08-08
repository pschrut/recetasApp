import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
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
  changes: boolean = false;

  constructor(public categoriesService: CategoriesService) { }

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
      this.categoriesService.addCategory(this.categories).subscribe((data: any) => {
        this.categories = [];
      });
    }
  }

  private deleteCategories() {
    if (this.idsToDelete.length > 0) {
      console.log(this.idsToDelete);
      this.categoriesService.deleteCategories(this.idsToDelete).subscribe((data: any) => {
        this.idsToDelete = [];
      });
    }
  }
}
