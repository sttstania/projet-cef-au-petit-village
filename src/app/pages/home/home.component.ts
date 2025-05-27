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
  figurines: FigurineModel[] = [];
  visibleFigurines: FigurineModel[] = [];
  currentPage = 0;
  itemsPerPage = 3;

  constructor(private figurineService: FigurineService, private router: Router) {}

  ngOnInit(): void {
    this.figurineService.getFigurines().subscribe(data => {
      this.figurines = data;
      this.updateVisibleFigurines();
    });
  }

  updateVisibleFigurines() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.visibleFigurines = this.figurines.slice(start, end);
  }

nextPage() {
  const maxPage = Math.floor((this.figurines.length - 1) / this.itemsPerPage);

  if (this.currentPage >= maxPage) {
    // Revenir au début
    this.currentPage = 0;
  } else {
    this.currentPage++;
  }

  this.updateVisibleFigurines();
}


  prevPage() {
     if (this.currentPage === 0) {
    // Aller à la dernière page
    this.currentPage = Math.floor((this.figurines.length - 1) / this.itemsPerPage);
  } else {
    this.currentPage--;
  }

  this.updateVisibleFigurines();
}

  goToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
}
