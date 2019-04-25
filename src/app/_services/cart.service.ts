import { StorageService } from './storage.service';
import { Cart } from './../_models/cart';
import { Injectable } from '@angular/core';
import { ProdutoDto } from '../_models/produto-dto';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  private quantity = {
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
    return this.checkToRemoveOrAdd(produto);
  }

  removeProduto(produto: ProdutoDto): Cart {
    return this.checkToRemoveOrAdd(produto);
  }

  increaseQuantity(produto: ProdutoDto): Cart {
    return this.changeQuantity(produto, this.quantity.INCREASE);
  }

  decreaseQuantity(produto: ProdutoDto): Cart {
    return this.changeQuantity(produto, this.quantity.DECREASE);
  }

  total(): number {
    const cart = this.getCart();
    let sum = 0;

    for (let i = 0; i < cart.items.length; i++) {
      sum += cart.items[i].produto.preco * cart.items[i].quantidade;
    }
    return sum;
  }

  private changeQuantity(produto: ProdutoDto, quantity: string): Cart {
    let cart = this.getCart();
    const position = cart.items.findIndex(x => x.produto.id === produto.id);

    if (position !== -1) {
      if (quantity === this.quantity.DECREASE) {
        cart.items[position].quantidade--;
        if (cart.items[position].quantidade < 1) {
          cart = this.removeProduto(produto);
        }
      } else if (quantity === this.quantity.INCREASE) {
        cart.items[position].quantidade++;
      }
    }

    this.storage.setCart(cart);
    return cart;
  }

  private checkToRemoveOrAdd(produto: ProdutoDto): Cart {
    const cart = this.getCart();
    const position = cart.items.findIndex(x => x.produto.id === produto.id);

    // if produto not exists in cart add; else remove
    if (position === -1) {
      cart.items.push({quantidade: 1, produto: produto});
    } else {
      cart.items.splice(position, 1);
    }

    this.storage.setCart(cart);
    return cart;
  }
}
