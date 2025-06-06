import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule
  ]
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEdit = false;
  productId?: number;
  categories: string[] = ['Electrónica', 'Accesorios', 'Ropa', 'Hogar'];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      available: [true]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.productId = +id;
        const product = this.productService.getProductById(this.productId);
        if (product) {
          this.productForm.patchValue(product);
        }
      }
    });
  }

  onSubmit() {
    if (this.productForm.invalid) return;
    const product: Product = {
      ...this.productForm.value,
      id: this.productId ?? 0
    };
    if (this.isEdit) {
      this.productService.updateProduct(product);
    } else {
      this.productService.addProduct(product);
    }
    this.router.navigate(['/productos']);
  }

  onCancel() {
    this.router.navigate(['/productos']);
  }
}
