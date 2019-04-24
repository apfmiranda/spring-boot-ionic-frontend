import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProdutoDto } from 'src/app/_models/produto-dto';
import { ProdutoService } from 'src/app/_services/produto.service';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDto;

  constructor(
      private route: ActivatedRoute,
      private produtoService: ProdutoService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        console.log(params);
        this.produtoService.findById(params.get('produto_id'))
        .pipe(
          tap(produto => {
            const prod: ProdutoDto = produto;
            this.loadImageUrl(prod);
          })
        )
        .subscribe(response => {
          this.item = response;
        },
        error => {});
      });
  }

  loadImageUrl(item: ProdutoDto) {
    this.produtoService.getSmallImageFromBucket(item.id)
      .subscribe(response => {
        item.imageUrl = `${environment.bucketBaseUrl}/prod${item.id}.jpg`;
      },
      error => {});
  }

  addToCart(item) {}
}
