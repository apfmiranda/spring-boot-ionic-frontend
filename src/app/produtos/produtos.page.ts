import { NavController, LoadingController } from '@ionic/angular';
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

  items: ProdutoDto[] = [];
  page = 0;

  bucketUrl: string;
  private loading: any;

  constructor(
    private loadCtrl: LoadingController,
    private produtoService: ProdutoService,
    private buckutService: BucketService,
    private route: ActivatedRoute,
    private navCtrl: NavController) { }

  async ngOnInit() {
    this.resetList();
    this.loadData();
  }

  private async loadData() {
    this.bucketUrl = environment.bucketBaseUrl;
    await this.presentLoading();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.produtoService.findByCategoria(params.get('categoria_id'), this.page, 10)
        .pipe(tap(produto => {
          const produtos: ProdutoDto[] = produto['content'];
          for (let index = 0; index < produtos.length; index++) {
            produtos[index] = this.buckutService.loadSmallImageProdutoUrl(produtos[index]);
          }
        })).subscribe(response => {
          this.items = this.items.concat(response['content']);
          console.log(this.page);
          console.log(this.items);
        }, error => { this.dismissLoading(); });
    });
    await this.dismissLoading();
  }

  showDetail(produto_id) {
    this.navCtrl.navigateForward(['/produto-detail', {produto_id: produto_id}]);
  }

  doRefresh(event) {
    this.resetList();
    setTimeout(() => {
      this.loadData();
      event.target.complete();
    }, 1000);
  }

  doInfinite(event) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  resetList() {
    this.items = [];
    this.page = 0;
  }

  private async presentLoading() {
    this.loading = await this.loadCtrl.create({
      message: 'Aguarde...',
      translucent: true,
    });
    this.loading.present();
  }


  private async dismissLoading() {
    this.loading.dismiss();
  }
}
