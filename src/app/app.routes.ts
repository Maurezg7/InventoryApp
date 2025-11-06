import { Routes } from '@angular/router';
import { ListProduct } from './list-product/list-product';
import { AddProduct } from './add-product/add-product';
import { EditProduct } from './edit-product/edit-product';

//http://localhost:4200/products
export const routes: Routes = [
  {path: 'products', component: ListProduct},
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'add-product', component: AddProduct},
  {path: 'edit-product/:id', component:EditProduct}
];
