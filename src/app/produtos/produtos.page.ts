import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { ProdutoDto } from '../_models/produto-dto';
import { ProdutoService } from '../_services/produto.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDto[];
  bucketUrl: string;

  constructor(
    public produtoService: ProdutoService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.bucketUrl = environment.bucketBaseUrl;

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        console.log(params);
        this.produtoService.findByCategoria(params.get('categoria_id'))
          .subscribe(response => {
            this.items = response['content'];
            this.loadImageUrls();
        },
        error => {});
      }
    );
  }

  loadImageUrls(start?: number, end?: number) {
    // for (let i = start; i <= end; i++) {

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${environment.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {});
    }
  }

  showDetail(itemId) {}
}
