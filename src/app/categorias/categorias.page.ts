import { Observable } from 'rxjs';
import { CategoriaService } from './categoria.service';
import { Component, OnInit } from '@angular/core';
import { CategoriaDto } from './categoria-dto';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  categorias$: Observable<CategoriaDto[]> ;

  constructor(public service: CategoriaService) { }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.categorias$ = this.service.findAll();
  }

}
