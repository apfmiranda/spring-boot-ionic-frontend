import { NavController } from '@ionic/angular';
import { ClienteService } from './../_services/cliente.service';
import { StorageService } from './../_services/storage.service';
import { Component, OnInit } from '@angular/core';
import { ClienteDto } from '../_models/cliente-dto';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente: ClienteDto;

  constructor(
    public navCtrl: NavController,
    public storage: StorageService,
    public clienteService: ClienteService) { }

  ngOnInit() {
    const localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(cliente => {
          this.cliente = cliente as ClienteDto;
          this.getImageIfExists();
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

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${environment.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    },
    error => {});
  }

}
