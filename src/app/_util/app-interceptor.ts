import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    iniciadas = 0;
    finalizadas = 0;

    constructor(
        public spinner:NgxSpinnerService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        const authReq = req.clone({
            headers: req.headers.set('authorId', '150')
        });
        this.spinner.show();
        this.iniciadas++;
        return next.handle(authReq).pipe(
          catchError((err: any) => {
            return throwError(() => err);
        }),
        finalize(() => {
            this.finalizadas++;
            if(this.iniciadas == this.finalizadas){
                this.iniciadas = 0;
                this.finalizadas = 0;
                this.spinner.hide();
            }
        })
      );
    }
}
