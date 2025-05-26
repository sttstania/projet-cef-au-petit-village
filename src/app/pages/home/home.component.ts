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
  itemsPerPage = 2;

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
    if ((this.currentPage + 1) * this.itemsPerPage < this.figurines.length) {
      this.currentPage++;
      this.updateVisibleFigurines();
    }
  }
  prevPage() {
    if (this.currentPage > 0 ) {
      this.currentPage--;
      this.updateVisibleFigurines();
    }
  }

  goToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
}
