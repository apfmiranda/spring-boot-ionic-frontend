import { CredenciaisDto } from './../_models/credenciais-dto';
import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  credenciais: CredenciaisDto = {
    email: '',
    senha: ''
  };

  constructor (public navCtrl: NavController, public menu: MenuController) {}

  login() {
    console.log(this.credenciais);
    this.navCtrl.navigateRoot('/categorias');
  }

  ngOnInit() {
    // this.menu.enable(false);
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

}
