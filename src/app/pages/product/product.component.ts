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
  figurines: FigurineModel[] = [];

  constructor(
    private figurineService: FigurineService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.figurineService.getFigurines().subscribe(data => {
      this.figurines = data;
    });
  }

  goToProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }
}
