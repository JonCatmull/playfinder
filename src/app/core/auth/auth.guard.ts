import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { delay, map } from 'rxjs/operators';
// import { TaxonomyService } from '../taxonomy/index';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        public authService: AuthService,
        public router: Router,
        private snackBar: MatSnackBar
    ) {}

    check(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {
        const reqPrivileges = route.data['privileges'] as Array<string>;
        const unauthorizedUrl = route.data['unauthorizedUrl'] as string || '/';

        if (this.authService.isLoggedIn) {
            if (this.authService.user) {
                // this.taxonomyService.getAllHot().subscribe();
                return this.checkPrivileges(reqPrivileges, unauthorizedUrl);
            } else {
                // Delay ensures user is stored in service first
                return this.authService.loadUser().pipe(
                    delay(10),
                    map(user => {
                        if (!!user) {
                            return this.checkPrivileges(reqPrivileges, unauthorizedUrl, user);
                        } else {
                            return false;
                        }
                    })
                );
            }
        }

        const snackBarRef = this.snackBar.open('Access denied', 'Login');
        snackBarRef.onAction().subscribe(() => {
            this.router.navigate(['/login']);
        });

        console.warn('Access denied, please login to access this page.');
        return false;
    }

    checkPrivileges(reqPrivileges: string[] = [], unauthorizedUrl = '/', user = this.authService.user) {
        if (this.authService.hasPrivileges(reqPrivileges, 'all', user)) {
            return true;
        } else {
            this.router.navigate([unauthorizedUrl]);
            this.snackBar.open('Permission denied');
            console.warn('You do not have the required permission to access this page.');
            return false;
        }
    }

    canActivate(route: ActivatedRouteSnapshot) {
        return this.check(route);
    }

    canActivateChild(route: ActivatedRouteSnapshot) {
        return this.check(route);
    }
}
