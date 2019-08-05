import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SectionsService } from '../../services/sections.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  tabSelected: string = 'categories';
  categories: Category[] = [];

  constructor(public sectionsService: SectionsService) { }

  ngOnInit() {
  }

  getCategories(event) {
    this.categories.push(event);
  }

  onSave() {
    this.sectionsService.addCategory(this.categories).subscribe((data: any) => {
      this.categories = [];
    });
  }

}
