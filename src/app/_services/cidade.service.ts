import { SignupPageModule } from './../signup/signup.module';
import { Observable } from 'rxjs';
import { CidadeDto } from './../_models/cidade-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(public http: HttpClient) { }

  findAll(estado_id: string): Observable<CidadeDto[]> {
    return this.http.get<CidadeDto[]>(`${environment.baseUrl}/estados/${estado_id}/cidades`);
  }
}
