import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category.model';
import { forkJoin } from 'rxjs';

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
  loading: boolean = false;

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
    this.loading = true;
    const saveServices = forkJoin(
      this.categoriesService.addCategory(this.categories),
      this.categoriesService.deleteCategories(this.idsToDelete)
    );

    saveServices.subscribe((data: any) => {
      this.categories = [];
      this.idsToDelete = [];
      this.loading = false;
    });
  }
}
