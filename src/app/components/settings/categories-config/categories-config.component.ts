import { Component, OnInit } from '@angular/core';
import { SectionsService } from '../../../services/sections.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-categories-config',
  templateUrl: './categories-config.component.html',
  styleUrls: ['./categories-config.component.css']
})
export class CategoriesConfigComponent implements OnInit {
  
  categories: Category[] = [];

  constructor(public sectionsService: SectionsService) { }

  ngOnInit() {
    this.sectionsService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onSubmit(f) {
    this.sectionsService.addCategory(f.value).subscribe((data: any) => {
      f.reset();
    });
  }

}
