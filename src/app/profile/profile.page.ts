import { NavController, LoadingController } from '@ionic/angular';
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

  private IMAGE_FROM = {
    GALLERY: 1,
    CAMERA: 2
  };

  cliente: ClienteDto;
  picture: string;
  cameraOn = false;
  private loading: any;

  constructor(
    private camera: Camera,
    private navCtrl: NavController,
    private storage: StorageService,
    private loadCtrl: LoadingController,
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
    this.getPicture(this.IMAGE_FROM.CAMERA);
  }

  getGalleryPicture() {
    this.getPicture(this.IMAGE_FROM.GALLERY);
  }

  getPicture(imageFrom: number) {
    this.cameraOn = !this.cameraOn;

    let options: CameraOptions;

    switch (imageFrom) {
      case this.IMAGE_FROM.GALLERY:
      options = {
        quality: 100,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE
      };
        break;
      case this.IMAGE_FROM.CAMERA:
      options = {
        quality: 100,
        cameraDirection: this.camera.Direction.FRONT,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE
      };
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = !this.cameraOn;
    }, (err) => {
      this.cameraOn = !this.cameraOn;
    });

  }

  async sendPicture() {
    await this.presentLoading('Enviando...');
    this.clienteService.uploadPicture(this.picture)
    .subscribe(response => {
      this.cancel();
      this.loadData();
    },
    error => {});
    await this.dismissLoading();
  }

  cancel() {
    this.picture = null;
  }

  private async presentLoading(msg: string) {
    this.loading = await this.loadCtrl.create({
      message: msg,
      translucent: true,
    });
    this.loading.present();
  }


  private async dismissLoading() {
    this.loading.dismiss();
  }

}
