import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SectionsService } from '../../../services/sections.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-categories-config',
  templateUrl: './categories-config.component.html',
  styleUrls: ['./categories-config.component.css']
})
export class CategoriesConfigComponent implements OnInit {
  
  categories: Category[] = [];
  idsToDelete: string[] = [];

  @Output() categoriesOutput = new EventEmitter<Category>();
  @Output() idsToDeleteOutput = new EventEmitter<string[]>();

  constructor(public sectionsService: SectionsService) { }

  ngOnInit() {
    this.sectionsService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onAdd(f) {
    const category = new Category(f.value.name, null);

    this.categories.push(category);
    this.categoriesOutput.emit(category);
    f.reset();
  }

  addToDelete(id) {
    this.idsToDelete.push(id);
    this.idsToDeleteOutput.emit(id);
  }
}
