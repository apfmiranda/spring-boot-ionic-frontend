import { CartService } from './../_services/cart.service';
import { CartItem } from './../_models/cart-item';
import { Cart } from './../_models/cart';
import { Component, OnInit } from '@angular/core';
import { BucketService } from '../_services/bucket.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items: CartItem[];

  constructor(
    private cartService: CartService,
    private bucketService: BucketService) { }

  ngOnInit() {
    const cart: Cart = this.cartService.getCart();
    this.items = cart.items;

    this.items.forEach(item => {
      item.produto = this.bucketService.loadRegularImageProdutoUrl(item.produto);
    });
  }

  decreaseQuantity(produto) {
    throw new Error('Method not implemented.');
  }

  increaseQuantity(produto) {
    throw new Error('Method not implemented.');
  }

  removeItem(produto) {
    throw new Error('Method not implemented.');
  }

  goOn() {
    throw new Error('Method not implemented.');
  }

  checkout() {
    throw new Error('Method not implemented.');
  }

  total(): number {
    throw new Error('Method not implemented.');
  }

}
