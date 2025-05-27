import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FigurineService } from '../services/figurines.service';
import { FigurineModel } from '../models/figurine.model';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  figurine?: FigurineModel;

  constructor(
    private route: ActivatedRoute,
    private figurineService: FigurineService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
   this.figurineService.getFigurineById(id).subscribe((data) => {
    if (data) {
      this.figurine = data;
    } else {
      // Gérer le cas où la figurine n'est pas trouvée
      console.error('Figurine non trouvée');
    }
  });
  }
}
