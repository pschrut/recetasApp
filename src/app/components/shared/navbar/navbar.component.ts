import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';
import { SectionsService } from '../../../services/sections.service';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categories: Category[] = [];

  constructor(public sectionsService: SectionsService) {
    this.sectionsService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  ngOnInit() {
  }

  showSettingsModal() {
    $('#settingsModal').modal('show');
  }

}
