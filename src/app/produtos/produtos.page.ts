import { Component, OnInit } from '@angular/core';
import { ProdutoDto } from '../_models/produto-dto';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDto[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        id: '1',
        nome: 'Mouse',
        preco: 80.99,
        imageUrl: ''
      },
      {
        id: '2',
        nome: 'Teclado',
        preco: 100.00,
        imageUrl: ''
      }
    ];
  }
  showDetail(itemId){}
}
