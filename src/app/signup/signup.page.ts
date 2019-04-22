import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm;
  estados: Array<{id: string, nome: string}>;
  cidades: Array<{id: string, nome: string}>;

  constructor() { }

  ngOnInit() {

    this.signupForm = new FormGroup({
      nome: new FormControl('')
    });
  }

  signupUser() {}

  updateCidades() {}

}
