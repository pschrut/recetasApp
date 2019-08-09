import { Injectable, EventEmitter } from '@angular/core';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  _ENDPOINT: string = environment.API_ENDPOINT;
  getCategoriesObs: EventEmitter<boolean> = new EventEmitter();

  constructor(public http: HttpClient) {
  }

  getCategories() {
    return this.http.get(`${this._ENDPOINT}/categories`).pipe(
      map((res: any) => {
        const categories: Category[] = [];

        res.forEach((category) => {
          categories.push(new Category(category.name, category.tech_name, category._id));
        });

        return categories;
      })
    );
  }

  getCategory(techName: string) {
    return this.http.get(`${this._ENDPOINT}/categories/${techName}`).pipe(
      map((res: any) => {
        return new Category(res[0].name, res[0].tech_name, res[0]._id);
      })
    );
  }

  addCategory(categories: Category[]) {
    this.getCategoriesObs.emit(true);
    return this.http.post(`${this._ENDPOINT}/categories`, categories).pipe(
      tap(() => {
        this.getCategoriesObs.emit(true);
      })
    );
  }

  deleteCategories(ids: string[]) {
    return this.http.post(`${this._ENDPOINT}/categories/delete`, { ids }).pipe(
      tap(() => {
        this.getCategoriesObs.emit(true);
      })
    );
  }

  editCategory(category: Category) {
    this.getCategoriesObs.emit(true);
    return this.http.put(`${this._ENDPOINT}/categories/${category.id}`, category).pipe(
      tap(() => {
        this.getCategoriesObs.emit(true);
      })
    );
  }
}
