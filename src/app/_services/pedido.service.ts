import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoDTO } from '../_models/pedido-dto';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  insert(pedido: PedidoDTO) {
    return this.http.post(`${environment.baseUrl}/pedidos`,
      pedido,
      {
        observe: 'response',
        responseType: 'text'
      });
  }
}
