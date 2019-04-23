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
            console.log('categorias: ', this.items);
        },
        error => {});
      }
    );
  }

  showDetail(itemId) {}
}
