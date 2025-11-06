import { Component, inject } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  imports: [],
  templateUrl: './list-product.html',
  styleUrl: './list-product.scss',
})
export class ListProduct {
  products!: Product[];

  private productService = inject(ProductService);
  private router = inject(Router)

  ngOnInit(){
    //Load the products
    this.getProducts();
  }

  private getProducts(): void{
    this.productService.getProductsList().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error("Error when obtaining the products: ", error);
      }
    });
  }

  editProduct(id:number){
    this.router.navigate(['edit-product', id]);
  }

  deleteProduct(id:number){
    this.productService.deleteProduct(id).subscribe({
      next: (data) => this.getProducts(),
      error: (error:any) => console.error(error)
    });
  }
}
