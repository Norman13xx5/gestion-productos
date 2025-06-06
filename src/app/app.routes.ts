import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'productos', component: ProductListComponent },
  { path: 'productos/nuevo', component: ProductFormComponent },
  { path: 'productos/editar/:id', component: ProductFormComponent },
  { path: '**', redirectTo: 'productos' }
];
