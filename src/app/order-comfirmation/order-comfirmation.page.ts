import { NavController } from '@ionic/angular';
import { EnderecoDto } from './../_models/endereco-dto';
import { ClienteDto } from './../_models/cliente-dto';
import { ClienteService } from './../_services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { PedidoDTO } from '../_models/pedido-dto';
import { CartItem } from '../_models/cart-item';
import { CartService } from '../_services/cart.service';
import { PedidoService } from '../_services/pedido.service';

@Component({
  selector: 'app-order-comfirmation',
  templateUrl: './order-comfirmation.page.html',
  styleUrls: ['./order-comfirmation.page.scss'],
})
export class OrderComfirmationPage implements OnInit {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDto;
  endereco: EnderecoDto;

  codpedido;

  constructor(
    private clienteService: ClienteService,
    private cartService: CartService,
    private navCtrl: NavController,
    private pedidoService: PedidoService
  ) {
    this.pedido = this.clienteService.getPedidoParaFinalizar();
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id)
    .subscribe(response => {
      this.cliente = response as ClienteDto;
      this.endereco  = (response['enderecos'] as EnderecoDto[]).filter(x => x.id === this.pedido.enderecoDeEntrega.id)[0];
    },
    erro => {
      this.navCtrl.navigateRoot(['/home']);
    });
  }

  total() {
    return this.cartService.total();
  }

  checkout() {
    this.pedidoService.insert(this.pedido)
    .subscribe(response => {
      this.cartService.createOrClearCartInLocalStorage();
      console.log(response.headers.get('location'));
    },
    error => {
      if (error.status === 403) {
        this.navCtrl.navigateRoot(['/home']);
      }
    });
  }

  home() {
    this.navCtrl.navigateRoot(['/home']);
  }

  back() {
    this.navCtrl.navigateRoot(['/cart']);
  }

}

