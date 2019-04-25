import { ClienteService } from './../_services/cliente.service';
import { NavController } from '@ionic/angular';
import { EnderecoDto } from './../_models/endereco-dto';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: EnderecoDto[];

  constructor(
    private navCtrl: NavController,
    private storage: StorageService,
    private clienteService: ClienteService) { }

  ngOnInit() {
    const localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];
        },
        error => {
          if (error.status === 403) {
            this.navCtrl.navigateRoot('/home');
          }
        });
    } else {
      this.navCtrl.navigateRoot('/home');
    }
  }

}
