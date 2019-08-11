import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    private authService: AuthService;

    constructor(
        private router: Router,
        private injector: Injector
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.authService = this.injector.get(AuthService);

        if (this.authService.token) {
            request = request.clone({
                headers: request.headers.set('token', this.authService.token)
            });
        }

        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.authService.resetLogoutTimer();
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.authService.logout();
                    }
                }
            })
        )
    }
}
