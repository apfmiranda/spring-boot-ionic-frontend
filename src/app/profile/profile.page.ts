import { NavController } from '@ionic/angular';
import { ClienteService } from './../_services/cliente.service';
import { StorageService } from './../_services/storage.service';
import { Component, OnInit } from '@angular/core';
import { ClienteDto } from '../_models/cliente-dto';
import { environment } from 'src/environments/environment.prod';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente: ClienteDto;
  picture: string;
  cameraOn = false;

  constructor(
    private camera: Camera,
    private navCtrl: NavController,
    private storage: StorageService,
    private clienteService: ClienteService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
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

  getCameraPicture() {
    this.cameraOn = !this.cameraOn;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = !this.cameraOn;
    }, (err) => {
     // Handle error
    });
  }

  sendPicture() {
    this.clienteService.uploadPicture(this.picture)
    .subscribe(response => {
      this.cancel();
      this.loadData();
    },
    error => {});
  }

  cancel() {
    this.picture = null;
  }

}
