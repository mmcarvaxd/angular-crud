import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = "http://localhost:3001/products"
  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  private errorHandler(e: any): Observable<any> {
    this.showMessage('Something is wrong :(, try it later!', true)
    return EMPTY
  }

  create(product: Product): Observable<Product> { 
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url)
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product)
  }

  delete(id): Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url)
  }
  
  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }
}
