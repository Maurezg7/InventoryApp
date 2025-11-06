import { Component, inject } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  imports: [FormsModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.scss',
})
export class EditProduct {
  product: Product = new Product();
  id!: number;

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe({
      next: (data) => (this.product = data),
      error: (error: any) => console.error(error),
    });
  }

  onSubmit() {
    //Edit product
    this.saveProduct();
  }

  saveProduct() {
    this.productService.editProduct(this.id, this.product).subscribe({
      next: (data) => this.irProductList(),
      error: (error: any) => console.error(error),
    });
  }

  irProductList() {
    this.router.navigate(['/products']);
  }
}
