import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings.component';
import { CategoriesConfigComponent } from './categories-config/categories-config.component';

@NgModule({
  declarations: [
    SettingsComponent,
    CategoriesConfigComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }
