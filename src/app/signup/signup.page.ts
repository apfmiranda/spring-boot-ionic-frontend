import { NavController, AlertController } from '@ionic/angular';
import { ClienteService } from './../_services/cliente.service';
import { EstadoService } from './../_services/estado.service';
import { CidadeService } from './../_services/cidade.service';
import { CidadeDto } from './../_models/cidade-dto';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EstadoDto } from '../_models/estado-dto';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  [x: string]: any;

  signupForm: FormGroup;
  estados: EstadoDto[];
  cidades: CidadeDto[];

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    public clienteService: ClienteService,
    public cidadeService: CidadeService,
    public estadoService: EstadoService) { }

  ngOnInit() {

    this.signupForm = this.formBuilder.group({
      nome:         ['Joaquim',           [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email:        ['joaquim@gmail.com', [Validators.required, Validators.email]],
      tipo :        ['1',                 [Validators.required]],
      cpfOuCnpj :   ['06134596280',       [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha :       ['123',               [Validators.required]],
      logradouro :  ['Rua Via',           [Validators.required]],
      numero :      ['25',                [Validators.required]],
      complemento : ['Apto 3',            []],
      bairro :      ['Copacabana',        []],
      cep :         ['10828333',          [Validators.required]],
      telefone1 :   ['977261827',         [Validators.required]],
      telefone2 :   ['',                  []],
      telefone3 :   ['',                  []],
      estadoId :    [null,                [Validators.required]],
      cidadeId :    [null,                [Validators.required]]
    });

    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.signupForm.controls['estadoId'].setValue(this.estados[0].id);
        this.updateCidades();
    },
    error => {});

  }

  updateCidades() {
    const estadoId = this.signupForm.controls['estadoId'].value;
    this.cidadeService.findAll(estadoId)
      .subscribe(response => {
        this.cidades = response;
        this.signupForm.controls['cidadeId'].setValue(null);
      },
      error => {});
  }

  signupUser() {
    this.clienteService.inserir(this.signupForm.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
    console.log(this.signupForm.value);
  }

  async showInsertOk() {
    const alert = await this.alertController.create({
      header: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.navigateForward('/home');
          }
        }
      ]
    });
    await alert.present();
  }

}
