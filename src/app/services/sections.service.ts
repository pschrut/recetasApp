import { Injectable, EventEmitter } from '@angular/core';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {
  _ENDPOINT: string = 'http://localhost:3000';

  refillCategories = new EventEmitter();

  constructor(public http: HttpClient) { }

  getCategories() {
    return this.http.get(`${this._ENDPOINT}/categories`).pipe(
      map((res: any) => {
        const categories: Category[] = [];

        res.forEach((category) => {
          categories.push(new Category(category.name, category.tech_name));
        });
        return categories;
      })
    );
  }

  getCategory(techName: string) {
    return this.http.get(`${this._ENDPOINT}/categories/${techName}`).pipe(
      map((res: any) => {
        return new Category(res[0].name, res[0].tech_name);
      })
    );
  }

  addCategory(category: Category) {
    return this.http.post(`http://localhost:3000/categories`, category).pipe(
      map(data => {
        console.log(data);
        this.refillCategories.emit(data);
      })
    );
  }
}
