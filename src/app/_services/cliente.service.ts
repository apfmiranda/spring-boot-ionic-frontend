import { PedidoDTO } from './../_models/pedido-dto';
import { SignupPageModule } from './../signup/signup.module';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { environment } from './../../environments/environment';
import { ClienteDto } from './../_models/cliente-dto';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private pedidoParaFinalizar: PedidoDTO;

  constructor(public http: HttpClient, public storage: StorageService) { }

  findByEmail(email: string) {
    return this.http.get(`${environment.baseUrl}/clientes/email?value=${email}`);
  }
  findById(id) {
    return this.http.get(`${environment.baseUrl}/clientes/${id}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    const url = `${environment.bucketBaseUrl}/cp${id}.jpg`;
    return this.http.get(url, {responseType: 'blob'});
  }

  inserir(cliente: ClienteDto) {
    return this.http.post(`${environment.baseUrl}/clientes`, cliente,
    {
      observe: 'response',
      responseType: 'text'
    });
  }

  setPedidoParaFinalizar(pedido: PedidoDTO) {
    this.pedidoParaFinalizar = pedido;
  }

  getPedidoParaFinalizar(): PedidoDTO {
    return this.pedidoParaFinalizar;
  }
}
