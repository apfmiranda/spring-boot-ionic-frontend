import { HttpClient } from '@angular/common/http';
import { CredenciaisDto } from './../_models/credenciais-dto';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }

  authenticate(credenciais: CredenciaisDto) {
    return this.http.post(
      `${environment.baseUrl}login`,
      credenciais,
      {
        observe: 'response',
        responseType: 'text'
      });
  }
}
