import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FigurineModel } from '../models/figurine.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'assets/data/figurines.json';

  constructor(private http: HttpClient) { }

  getFigurines(): Observable<FigurineModel[]> {
    return this.http.get<FigurineModel[]>(this.url).pipe(
      map(data => data.map(item => new FigurineModel(item)))
    );
  }
}
