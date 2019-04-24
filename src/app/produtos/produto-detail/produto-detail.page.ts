import { Component, OnInit } from '@angular/core';
import { ProdutoDto } from 'src/app/_models/produto-dto';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDto = {
    id: '1',
    nome: 'Computador',
    preco: 100.00
  };

  constructor() { }

  ngOnInit() {
  }

  addToCart(item){}
}
