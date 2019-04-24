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

  findById(id: string): Observable<ProdutoDto> {
    return this.http.get<ProdutoDto>(`${environment.baseUrl}/produtos/${id}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    const url = `${environment.bucketBaseUrl}/prod${id}.jpg`;
    return this.http.get(url, {responseType : 'blob'});
  }

  getSmallImageFromBucket(id: string): Observable<any> {
    const url = `${environment.bucketBaseUrl}/prod${id}-small.jpg`;
    return this.http.get(url, {responseType : 'blob'});
  }

}
