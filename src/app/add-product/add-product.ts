import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct {
  product: Product = new Product();

  private productService = inject(ProductService);
  private router = inject(Router);

  onSubmit(){
    this.saveProduct();
  }

  private saveProduct(){
    this.productService.addProduct(this.product).subscribe({
      next: (data) => {
        this.irListProduct();
      },
      error: (error:any) => {
        console.error(error);
      }
    });
  }

  private irListProduct(){
    this.router.navigate(['/products']);
  }
}
