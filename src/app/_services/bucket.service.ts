import { environment } from './../../environments/environment';
import { ProdutoService } from './produto.service';
import { Injectable } from '@angular/core';
import { ProdutoDto } from '../_models/produto-dto';

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  constructor(private produtoService: ProdutoService) { }

  private loadImageProdutoUrl(item: ProdutoDto, small: boolean = false): ProdutoDto {

    const sufix = small ? '-small' : '';

    this.produtoService.getSmallImageFromBucket(item.id)
    .subscribe(response => {
      item.imageUrl = `${environment.bucketBaseUrl}/prod${item.id}${sufix}.jpg`;
    },
    error => {});

    return item;
  }

  loadSmallImageProdutoUrl(item: ProdutoDto): ProdutoDto {
    return this.loadImageProdutoUrl(item, true);
  }

  loadRegularImageProdutoUrl(item: ProdutoDto): ProdutoDto {
    return this.loadImageProdutoUrl(item, false);
  }
}
