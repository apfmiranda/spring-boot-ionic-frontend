import { StorageService } from './storage.service';
import { Cart } from './../_models/cart';
import { Injectable } from '@angular/core';
import { ProdutoDto } from '../_models/produto-dto';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  private ACTION = {
    ADD:      1,
    REMOVE:   2,
    DECREASE: 3,
    INCREASE: 4
  };

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
    return this.doActionInCart(produto, this.ACTION.ADD);
  }

  removeProduto(produto: ProdutoDto): Cart {
    return this.doActionInCart(produto, this.ACTION.REMOVE);
  }

  increaseQuantity(produto: ProdutoDto): Cart {
    return this.doActionInCart(produto, this.ACTION.INCREASE);
  }

  decreaseQuantity(produto: ProdutoDto): Cart {
    return this.doActionInCart(produto, this.ACTION.DECREASE);
  }

  total(): number {
    const cart = this.getCart();
    let sum = 0;

    for (let i = 0; i < cart.items.length; i++) {
      sum += cart.items[i].produto.preco * cart.items[i].quantidade;
    }
    return sum;
  }

  private doActionInCart(produto: ProdutoDto, action: number ): Cart {
    let cart = this.getCart();
    const position = cart.items.findIndex(x => x.produto.id === produto.id);
    const prodExists = (position !== -1);

    switch (action) {
      case this.ACTION.ADD:
        // if produto not exists in cart add; else incriese
        (!prodExists) ? cart.items.push({quantidade: 1, produto: produto}) : this.increaseQuantity(produto);
        break;
      case this.ACTION.REMOVE:
        if (prodExists) {cart.items.splice(position, 1); }
        break;
      case this.ACTION.INCREASE:
        cart.items[position].quantidade++;
        break;
      case this.ACTION.DECREASE:
        cart.items[position].quantidade--;
        if (cart.items[position].quantidade < 1) {cart = this.removeProduto(produto); }
        break;
    }

    this.storage.setCart(cart);
    return cart;
  }
}
