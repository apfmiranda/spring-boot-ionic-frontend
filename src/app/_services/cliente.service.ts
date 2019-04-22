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

  constructor(public http: HttpClient, public storage: StorageService) { }

  findByEmail(email: string): Observable<ClienteDto> {
    // uso temporario antes de implementar interceptor
    const token = this.storage.getLocalUser().token;
    const authHaeder = new HttpHeaders({'Authorization': 'Bearer ' + token});

    return this.http.get<ClienteDto>(
      `${environment.baseUrl}/clientes/email?value=${email}`,
      {'headers': authHaeder});
  }

  getImageFromBucket(id: string): Observable<any> {
    const url = `${environment.bucketBaseUrl}/cp${id}.jpg`;
    return this.http.get(url, {responseType: 'blob'});
  }
}
