import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectionsService } from '../../../services/sections.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-content-panel',
  templateUrl: './content-panel.component.html',
  styleUrls: ['./content-panel.component.css']
})
export class ContentPanelComponent implements OnInit {
  sectionObj: Category = new Category(null, null);

  constructor(public activatedRoute: ActivatedRoute, public sectionsService: SectionsService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.sectionsService.getCategory(params.category).subscribe(((category: any) => {
        this.sectionObj = category;
      }));
    });
  }

}
