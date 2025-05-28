import { Pipe, PipeTransform } from '@angular/core';
import { FigurineModel } from './models/figurine.model';

// Déclaration pipe
@Pipe({
  name: 'sortByPrice',
  standalone: false
})
export class SortByPricePipe implements PipeTransform {

  //  Méthode transform, pipe personalisé
  transform(fig: FigurineModel[], order: 'asc' | 'desc'): FigurineModel[] {
    // verifie si entree valable (liste existante  tableau)
    if (!fig || !Array.isArray(fig)) return [];
    
    // tri de la liste selon l'ordre demandé
    return fig.sort((a,b) => {
      return order === 'asc' 
        ? a.price - b.price             //croissant
        : b.price -a.price;             // Decroissant
    });
  }
}
