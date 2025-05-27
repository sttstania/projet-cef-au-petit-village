import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FigurineModel } from '../models/figurine.model';

@Injectable({
  providedIn: 'root'
})
export class FigurineService {
  private url = 'assets/data/figurines.json';

  constructor(private http: HttpClient) { }

  // Récupère toutes les figurines
  getFigurines(): Observable<FigurineModel[]> {
    return this.http.get<FigurineModel[]>(this.url).pipe(
      map(data => data.map(item => new FigurineModel(item)))
    );
  }

  // Récupère UNE figurine par ID (via le JSON)
  getFigurineById(id: number): Observable<FigurineModel | undefined> {
    return this.getFigurines().pipe(
      map(figurines => figurines.find(fig => fig.id === id))
    );
  }
}
