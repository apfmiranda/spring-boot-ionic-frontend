import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProdutoDto } from '../_models/produto-dto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(public http: HttpClient) { }

  findByCategoria(categoria_id: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/produtos/?categorias=${categoria_id}`);
  }
}
