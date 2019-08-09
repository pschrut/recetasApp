import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../models/category.model';
import { element } from 'protractor';

@Component({
  selector: 'app-categories-config',
  templateUrl: './categories-config.component.html',
  styleUrls: ['./categories-config.component.css']
})
export class CategoriesConfigComponent implements OnInit {

  categories: Category[] = [];
  idsToDelete: string[] = [];
  categoryEdit: Category = new Category(null, null);
  loading: boolean = false;

  @ViewChild('edit', { static: false }) edit: ElementRef;

  @Output() categoriesOutput = new EventEmitter<Category>();
  @Output() idsToDeleteOutput = new EventEmitter<string>();
  @Output() changes = new EventEmitter<boolean>();

  constructor(public categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onAdd(f) {
    const category = new Category(f.value.name, null, null, true);

    this.categories.push(category);
    this.categoriesOutput.emit(category);
    this.changesEmitter();
    f.reset();
  }

  addToDelete(category: Category) {
    if (category.id === null) {
      this.categories.splice(this.getDeleteArray(category), 1);
    } else {
      this.idsToDelete.push(category.id);
      this.idsToDeleteOutput.emit(category.id);
    }
    this.changesEmitter();
  }

  categoryToEdit(category: Category) {
    this.categoryEdit = category;
    setTimeout(() => {
      this.edit.nativeElement.focus();
    }, 1);
  }

  confirmEdit(category: Category) {
    this.categories.find((item: Category) => {
      if (item.name === category.name) {
        item.name = this.edit.nativeElement.value;
        this.loading = true;
        this.categoriesService.editCategory(item).subscribe((data: any) => {
          this.categoryEdit = new Category(null, null);
          this.loading = false;
        });

        return true;
      }
    });

  }

  removeFromDelete(category: Category) {
    this.idsToDelete.splice(this.getDeleteArray(category), 1);
    this.changesEmitter();
  }

  getDeleteArray(category: Category) {
    return this.idsToDelete.indexOf(category.id);
  }

  getRowClass(category: Category) {
    if (this.getDeleteArray(category) !== -1) {
      return 'itemDelete';
    }

    if (category.isNew) {
      return 'itemAdded';
    }
  }

  private changesEmitter(forceValue?: boolean) {
    if (forceValue) {
      return this.changes.emit(forceValue);
    }
    const newCategories = this.categories.findIndex(item => item.id === null);
    return (this.idsToDelete.length > 0 || newCategories !== -1) ? this.changes.emit(true) : this.changes.emit(false);
  }
}
