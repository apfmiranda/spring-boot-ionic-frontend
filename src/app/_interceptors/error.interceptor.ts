import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

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
                    const error = err.error.message || err.statusText;
                    return throwError(error);
                })
            );
    }
}
