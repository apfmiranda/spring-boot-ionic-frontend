import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../_services/storage.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    localUser;

    constructor(public storage: StorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.okIntercept(req)) {
            const dupReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + this.localUser.token )});
            return next.handle(dupReq);
        } else {
            return next.handle(req);
        }
    }

    private okIntercept(req: HttpRequest<any>) {

        const N = environment.baseUrl.length;
        const requestToAPI = req.url.substring(0, N) === environment.baseUrl;

        this.localUser = this.storage.getLocalUser();

        return (this.localUser && requestToAPI);
    }
}
