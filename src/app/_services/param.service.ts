import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamService {
  private destn: any;
  constructor() {}

  public setDestn(destn) {
    this.destn = destn;
  }

  getDestn() {
    return this.destn;
  }
}
