import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { ProdutoDto } from '../_models/produto-dto';
import { ProdutoService } from '../_services/produto.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BucketService } from '../_services/bucket.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDto[];
  bucketUrl: string;

  constructor(
    private produtoService: ProdutoService,
    private buckutService: BucketService,
    private route: ActivatedRoute,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.bucketUrl = environment.bucketBaseUrl;

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.produtoService.findByCategoria(params.get('categoria_id'))
        .pipe(
          tap(produto => {
            const produtos: ProdutoDto[] = produto['content']
            for (let index = 0; index < produtos.length; index++) {
              produtos[index] = this.buckutService.loadSmallImageProdutoUrl(produtos[index]);
            }
          })
        ).subscribe(response => {
          this.items = response['content'];
        },
        error => {});
      }
    );
  }

  showDetail(produto_id) {
    this.navCtrl.navigateForward(['/produto-detail', {produto_id: produto_id}]);
  }
}
