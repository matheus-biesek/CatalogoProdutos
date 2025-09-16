import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductDetailComponent } from './components/product-detail/product-detail';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: '**', redirectTo: '' }
];