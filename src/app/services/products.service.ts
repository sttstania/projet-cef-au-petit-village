import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'assets/data/products.json';
  
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
