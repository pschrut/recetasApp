import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../../models/category.model';
import { CategoriesService } from '../../../services/categories.service';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() categories: Category[] = [];
  pendingChanges: boolean;

  constructor(public categoriesService: CategoriesService) {
    this.categoriesService.pendingChanges.subscribe({
      next: (data) => {
        this.pendingChanges = data;
      }
    });
  }

  ngOnInit() {
    this.categoriesService.getCategoriesObs.subscribe({
      next: (data) => {
        if (data) {
          this.categoriesService.getCategories().subscribe((data: any) => {
            this.categories = data;
          });
        }
      }
    });
  }

  showSettingsModal() {
    $('#settingsModal').modal('show');
  }

}
