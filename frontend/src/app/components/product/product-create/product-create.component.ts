import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ProductService } from './../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  createProduct(): void {
    this.productService.showMessage('Product was created successfully!')
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
