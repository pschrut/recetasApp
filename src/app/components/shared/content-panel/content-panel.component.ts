import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-content-panel',
  templateUrl: './content-panel.component.html',
  styleUrls: ['./content-panel.component.css']
})
export class ContentPanelComponent implements OnInit {
  sectionObj: Category = new Category(null, null);

  constructor(public activatedRoute: ActivatedRoute, public categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.categoriesService.getCategory(params.category).subscribe(((category: any) => {
        this.sectionObj = category;
      }));
    });
  }

}
