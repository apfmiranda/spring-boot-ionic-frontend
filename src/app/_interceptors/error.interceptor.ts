import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../_services/storage.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request)
            .pipe(
                catchError(err => {
                    let errorObj = err;
                    if (errorObj.error) {
                        errorObj = errorObj.console.error;
                        if (!errorObj.status) {
                            errorObj = JSON.parse(errorObj);
                        }
                    }

                    switch (errorObj.status) {
                        case 403:
                            this.hadle403();
                            break;
                        default:
                            break;
                    }
                    const error = err.error.message || err.statusText;
                    return throwError(error);
                })
            );
    }

    hadle403() {
        this.storage.setLocalUser(null);
    }
}
