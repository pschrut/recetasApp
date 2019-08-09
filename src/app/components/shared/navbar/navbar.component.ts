import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';
import { CategoriesService } from '../../../services/categories.service';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categories: Category[] = [];

  constructor(public categoriesService: CategoriesService) { }

  ngOnInit() {
    this.getCategoriesService();

    this.categoriesService.getCategoriesObs.subscribe((data: boolean) => {
      if (data) {
        this.getCategoriesService();
      }
    });
  }

  getCategoriesService() {
    this.categoriesService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  showSettingsModal() {
    $('#settingsModal').modal('show');
  }

}
