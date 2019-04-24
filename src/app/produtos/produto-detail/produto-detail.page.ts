import { NavController } from '@ionic/angular';
import { CartService } from './../../_services/cart.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProdutoDto } from 'src/app/_models/produto-dto';
import { ProdutoService } from 'src/app/_services/produto.service';
import { tap } from 'rxjs/operators';
import { BucketService } from 'src/app/_services/bucket.service';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDto;

  constructor(
      private route: ActivatedRoute,
      private navCtrl: NavController,
      private produtoService: ProdutoService,
      private bucketService: BucketService,
      private cartService: CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.produtoService.findById(params.get('produto_id'))
        .pipe(
          tap(produto => {
            let prod: ProdutoDto = produto;
            prod = this.bucketService.loadRegularImageProdutoUrl(prod);
          })
        )
        .subscribe(response => {
          this.item = response;
        },
        error => {});
      });
  }

  addToCart(produto: ProdutoDto) {
    this.cartService.addProduto(produto);
    this.navCtrl.navigateForward(['/cart']);
  }
}
