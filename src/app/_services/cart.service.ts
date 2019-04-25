import { StorageService } from './storage.service';
import { Cart } from './../_models/cart';
import { Injectable } from '@angular/core';
import { ProdutoDto } from '../_models/produto-dto';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  private action = {
    ADD: 'add',
    REMOVE: 'remove',
    DECREASE: 'decrease',
    INCREASE: 'increase'
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
    return this.doActionInCart(produto, this.action.ADD);
  }

  removeProduto(produto: ProdutoDto): Cart {
    return this.doActionInCart(produto, this.action.REMOVE);
  }

  increaseQuantity(produto: ProdutoDto): Cart {
    return this.doActionInCart(produto, this.action.INCREASE);
  }

  decreaseQuantity(produto: ProdutoDto): Cart {
    return this.doActionInCart(produto, this.action.DECREASE);
  }

  total(): number {
    const cart = this.getCart();
    let sum = 0;

    for (let i = 0; i < cart.items.length; i++) {
      sum += cart.items[i].produto.preco * cart.items[i].quantidade;
    }
    return sum;
  }

  private doActionInCart(produto: ProdutoDto, action: string ): Cart {
    let cart = this.getCart();
    const position = cart.items.findIndex(x => x.produto.id === produto.id);
    const prodExists = (position !== -1);

    switch (action) {
      case this.action.ADD:
        // if produto not exists in cart add; else incriese
        (!prodExists) ? cart.items.push({quantidade: 1, produto: produto}) : this.increaseQuantity(produto);
        break;
      case this.action.REMOVE:
        if (prodExists) {cart.items.splice(position, 1); }
        break;
      case this.action.INCREASE:
        cart.items[position].quantidade++;
        break;
      case this.action.DECREASE:
        cart.items[position].quantidade--;
        if (cart.items[position].quantidade < 1) {cart = this.removeProduto(produto); }
        break;
    }

    this.storage.setCart(cart);
    return cart;
  }
}
