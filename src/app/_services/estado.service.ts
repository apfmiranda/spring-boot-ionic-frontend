import { EstadoDto } from './../_models/estado-dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(public http: HttpClient) { }

  findAll(): Observable<EstadoDto[]> {
    return this.http.get<EstadoDto[]>(`${environment.baseUrl}/estados`);
  }
}
