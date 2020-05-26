import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductReadDataSource } from './product-read-datasource';
@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Product>;
  dataSource: ProductReadDataSource;
  products: Product[]

  displayedColumns = ['id', 'name', 'price', 'action'];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.dataSource = new ProductReadDataSource()
    this.productService.read().subscribe(products => {
      this.products = products
      this.insertDataTable(products)
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  insertDataTable(products) {
    this.dataSource.data = products
  }
}
