import { FieldMessage } from './../_models/field-message';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../_services/storage.service';
import { AlertController } from '@ionic/angular';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        public storage: StorageService,
        public alertController: AlertController
        ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request)
            .pipe(
                catchError((error, caught) => {

                    let errorObj = error;
                    if (errorObj.error) {
                        errorObj = errorObj.error;
                    }
                    if (!errorObj.status) {
                        errorObj = JSON.parse(errorObj);
                    }

                    switch (errorObj.status) {
                        case 401:
                            this.handled401();
                            console.log('case 401:');
                            break;
                        case 403:
                            this.handled403();
                            break;
                        case 422:
                            this.handled422(errorObj);
                            break;
                        default:
                            this.handledDefaultError(errorObj);
                            break;
                    }

                    return throwError(errorObj);
                })
            );
    }

    async handled422(err) {
        const alert = await this.alertController.create({
            header: 'ERRO 422: Validação',
            message: this.listErrors(err.errors),
            buttons: ['OK']
        });
        await alert.present();
    }

    listErrors(errors: FieldMessage[]): string {
        let s = '';
        for (let index = 0; index < errors.length; index++) {
            s = s + '<p><strong>'
                  + errors[index].fieldName
                  + '</strong>: '
                  + errors[index].message
                  + '</p>';
        }

        return s;

    }

    async handledDefaultError(err: any) {
        const alert = await this.alertController.create({
            header: 'ERRO ' + err.status,
            subHeader: err.error,
            message: err.message,
            buttons: ['OK']
        });
        await alert.present();
    }

    async handled401() {
        const alert = await this.alertController.create({
            header: 'ERRO 401',
            subHeader: 'Falha de autenticação',
            message: 'Email ou senha incorretos',
            buttons: ['OK']
          });
          await alert.present();
    }

    handled403() {
        this.storage.setLocalUser(null);
    }
}
