import { Component } from '@angular/core';
import { FigurineModel } from '../../models/figurine.model';
import { FigurineService } from '../../services/figurines.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  figurines: FigurineModel[] = [];  //liste complete de toutes les figurines 
  visibleFigurines: FigurineModel[] = []; //liste de fig visibles actuellement apres tri recherche...
  currentPage = 0; //page actuelle
  itemsPerPage = 3; //nombre de fig par page
  sortOrder: 'asc' | 'desc' = 'asc'; //ordre de tri
  searchText: string = ''; // texte saisi par l'utilisateur dans barre recherche

  constructor(private figurineService: FigurineService, private router: Router) {}

  ngOnInit(): void {
    //appelle servixe pour recuperer fig (assynchrone)
    this.figurineService.getFigurines().subscribe(data => {
      this.figurines = data;  //stock toutes les fig
      this.updateVisibleFigurines();  //met a jour l'affichage
    });
  }

  //suprime les accents et met en minuscule pour faciliter recherche
  normalizeText(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  //met a jour la liste visible 
  updateVisibleFigurines() {
    const normalizedSearch = this.normalizeText(this.searchText);

    //filtre selon le texte recherche dans nom ou description
    const filtered = this.figurines.filter(f =>
      this.normalizeText(f.name).includes(normalizedSearch) ||
      this.normalizeText(f.description).includes(normalizedSearch)
    );

    //tri selon prix
    const sorted = filtered.sort((a, b) =>
      this.sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );

    //decoupe tableau selon la page actuelle
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    //met a jour la liste affichee sur la page
    this.visibleFigurines = sorted.slice(start, end);
  }

  onSearch() {
    this.currentPage = 0;  //revient a la premiere page
    this.updateVisibleFigurines(); //applique recherche + tri + pagination
  }


  onSortOrderChange() {
    this.updateVisibleFigurines();  //relance le tri
  }

  //page suivante
  nextPage() {
    const maxPage = Math.floor((this.figurines.length - 1) / this.itemsPerPage);
    this.currentPage = this.currentPage >= maxPage ? 0 : this.currentPage + 1;
    this.updateVisibleFigurines();
  }

  //page precedente
  prevPage() {
    const maxPage = Math.floor((this.figurines.length - 1) / this.itemsPerPage);
    this.currentPage = this.currentPage === 0 ? maxPage : this.currentPage - 1;
    this.updateVisibleFigurines();
  }

  //redirige vers la page de detail du produit cliqué
  goToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
}
