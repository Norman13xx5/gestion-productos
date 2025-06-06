import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['name', 'description', 'price', 'category', 'available', 'actions'];
  categories: string[] = ['Electrónica', 'Accesorios', 'Ropa', 'Hogar'];
  selectedCategory: string = '';
  selectedAvailable: string = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.applyFilters();
    });
  }

  applyFilters() {
    const category = this.selectedCategory || undefined;
    let available: boolean | undefined = undefined;
    if (this.selectedAvailable === 'true') available = true;
    if (this.selectedAvailable === 'false') available = false;
    this.products = this.productService.filterProducts(category, available);
  }

  editProduct(id: number) {
    this.router.navigate(['/productos/editar', id]);
  }

  deleteProduct(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: '¿Estás seguro de que deseas eliminar este producto?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(id);
      }
    });
  }
}
