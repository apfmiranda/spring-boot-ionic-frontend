import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './../_services/categoria.service';
import { CategoriaDto } from './../_models/categoria-dto';
import { environment } from './../../environments/environment';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  categorias$: Observable<CategoriaDto[]> ;
  bucketUrl: String = environment.bucketBaseUrl;

  constructor(
    public service: CategoriaService,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.categorias$ = this.service.findAll();
  }

  showProdutos(categoria_id: string) {
    this.navCtrl.navigateForward(['/produtos', {categoria_id: categoria_id}]);
  }

}
