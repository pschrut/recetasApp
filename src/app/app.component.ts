import { Component, OnInit } from '@angular/core';
import { Category } from './models/category.model';
import { CategoriesService } from './services/categories.service';
import { forkJoin } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recetario';
  categories: Category[] = [];
  loading: boolean = true;
  completed: boolean[] = [false];

  constructor(public categoriesService: CategoriesService) { }

  ngOnInit() {
    this.callInitialServices();
  }

  callInitialServices() {
    this.categoriesService.getCategories().subscribe((data: any) => {
      this.categories = data;
      this.loading = false;
      this.completed[0] = true;
    });
  }
}
