import { StorageService } from './storage.service';
import { Cart } from './../_models/cart';
import { Injectable } from '@angular/core';
import { ProdutoDto } from '../_models/produto-dto';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private storage: StorageService) { }

  createOrClearCartInLocalStorage(): Cart {
    const cart: Cart = {items: []};
    this.storage.setCart(cart);
    return cart;
  }

  getCart(): Cart {
    let cart: Cart = this.storage.getCart();
    if (cart === null) {
      cart = this.createOrClearCartInLocalStorage();
    }
    return cart;
  }

  addProduto(produto: ProdutoDto): Cart {
    const cart = this.getCart();

    const position = cart.items.findIndex(x => x.produto.id === produto.id);

    if (position === -1) {
      cart.items.push({quantidade: 1, produto: produto});
    }
    this.storage.setCart(cart);
    return cart;
  }
}
