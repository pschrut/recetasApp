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
  newCategories: Category[] = [];
  idsToDelete: string[] = [];
  changes: boolean = false;
  loading: boolean = false;
  saved: boolean = false;

  constructor(public categoriesService: CategoriesService) { }

  ngOnInit() {
    $('#settingsModal').on('hidden.bs.modal', () => {
      this.categoriesService.pendingChanges.emit(!this.saved);
    });
  }

  getCategories(event) {
    this.newCategories.push(event);
    this.saved = false;
  }

  getIdsToDelete(event) {
    this.idsToDelete.push(event);
    this.saved = false;
  }

  onSave() {
    this.loading = true;
    const saveServices = forkJoin(
      this.categoriesService.addCategory(this.newCategories),
      this.categoriesService.deleteCategories(this.idsToDelete)
    );

    saveServices.subscribe((data: any) => {
      this.setInitialState();
    });
  }

  setInitialState() {
    this.newCategories = [];
    this.idsToDelete = [];
    this.changes = false;
    this.loading = false;
    this.saved = true;
    this.categoriesService.pendingChanges.emit(!this.saved);
  }
}
