import { Pipe, PipeTransform } from '@angular/core';
import { FigurineModel } from './models/figurine.model';

@Pipe({
  name: 'sortByPrice',
  standalone: false
})
export class SortByPricePipe implements PipeTransform {

  transform(fig: FigurineModel[], order: 'asc' | 'desc'): FigurineModel[] {
    if (!fig || !Array.isArray(fig)) return [];
    
    return fig.sort((a,b) => {
      return order === 'asc' ? a.price - b.price : b.price -a.price;
    });
  }
}
