import { NavController } from '@ionic/angular';
import { CartService } from './../_services/cart.service';
import { CartItem } from './../_models/cart-item';
import { Cart } from './../_models/cart';
import { Component, OnInit } from '@angular/core';
import { BucketService } from '../_services/bucket.service';
import { ProdutoDto } from '../_models/produto-dto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items: CartItem[];

  constructor(
    private cartService: CartService,
    private bucketService: BucketService,
    private navCtrl: NavController) { }

  ngOnInit() {
    const cart: Cart = this.cartService.getCart();
    this.items = cart.items;

    this.items.forEach(item => {
      item.produto = this.bucketService.loadRegularImageProdutoUrl(item.produto);
    });
  }

  decreaseQuantity(produto: ProdutoDto) {
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  increaseQuantity(produto: ProdutoDto) {
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  removeItem(produto: ProdutoDto) {
    this.items = this.cartService.removeProduto(produto).items;
  }

  goOn() {
    this.navCtrl.navigateForward(['/categorias']);
  }

  checkout() {
    this.navCtrl.navigateForward(['/pick-address']);
  }

  total(): number {
    return this.cartService.total();
  }

}
