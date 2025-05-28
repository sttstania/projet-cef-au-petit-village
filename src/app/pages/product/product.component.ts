import { Component, OnInit } from '@angular/core';
import { FigurineModel } from '../../models/figurine.model';
import { FigurineService } from '../../services/figurines.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  figurines: FigurineModel[] = [];          //liste de figurines

  constructor(
    private figurineService: FigurineService,    //injection du service
    private router: Router                       //navigation
  ) {}

  ngOnInit(): void {
    this.figurineService.getFigurines().subscribe(data => {
      // appel du service au chargement du composant pour recuperer les figurines
      this.figurines = data;
    });
  }

  // redirige vers la page du produit cliqué
  goToProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }
}
