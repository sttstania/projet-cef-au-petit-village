import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Pour récupérer l'ID depuis l'URL
import { FigurineService } from '../services/figurines.service';
import { FigurineModel } from '../models/figurine.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  figurine?: FigurineModel;        // Donnée de la figurine à afficher
  figurineNotFound: boolean = false;

  constructor(
    private route: ActivatedRoute,   // Récupération des paramètres de l'URL
    private figurineService: FigurineService,          // Récupération des paramètres de l'URL
    private location: Location                        //Inject location 
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));    // Extraction de l'ID depuis l'URL
   this.figurineService.getFigurineById(id).subscribe((data) => {
    if (data) {
      this.figurine = data;                         // Si figurine trouvée, on l'affiche
    } else {
      // Gérer le cas où la figurine n'est pas trouvée
      console.error('Figurine non trouvée');     // Sinon, log d'erreur
      this.figurineNotFound = true;              //Active le message d'erreur
    }
  });
  }

  // Retour a la page precedente
  goBack(): void {
    console.log('Retour demandé');
    this.location.back();
  }
}
