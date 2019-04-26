import { ClienteService } from './../_services/cliente.service';
import { ParamService } from './../_services/param.service';
import { map, tap } from 'rxjs/operators';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PedidoDTO } from '../_models/pedido-dto';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  pedido: PedidoDTO;
  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  paymentForm: FormGroup;

  constructor(
    private clienteService: ClienteService,
    public navCtrl: NavController,
    private formBuilder: FormBuilder) {

      this.pedido = this.clienteService.getPedidoFinalizado();
  }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      numeroDeParcelas: [1, Validators.required],
      '@type'         : ['pagamentoComCartao', Validators.required]
    });
  }

  nextPage() {
    this.pedido.pagamento = this.paymentForm.value;
  }

}
