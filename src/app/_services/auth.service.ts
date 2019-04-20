import { StorageService } from './storage.service';
import { LocalUser } from './../_models/local-user';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDto } from './../_models/credenciais-dto';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient, public storage: StorageService) { }

  authenticate(credenciais: CredenciaisDto) {
    return this.http.post(
      `${environment.baseUrl}login`,
      credenciais,
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  successfulLogin(autorizationValue: string) {
    const tok = autorizationValue.substring(7);
    const user: LocalUser = {
      token: tok
    };

    this.storage.setLocalUser(user);
  }

  logout() {
    this.storage.setLocalUser(null);
  }

}
