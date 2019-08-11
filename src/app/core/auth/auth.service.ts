import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../../environments/environment';

import { User } from '../../models/user';
import { share, shareReplay, tap } from 'rxjs/operators';
import { UtilityService } from '../../services/utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    public status: Subject<User>;
    private _user: User;
    private logoutTimer: any;
    private obs: Observable<User>;

    constructor(
        public http: HttpClient,
        public router: Router,
        public utilityService: UtilityService
    ) {
        this.status = new Subject<User>();
    }

    get userStatus(): Observable<User> {
        return this.status.asObservable();
    }

    get isLoggedIn() {
        return !!this.token;
    }

    get token() {
        return (this.utilityService.isBrowser()) ? localStorage.getItem('token') : '';
    }
    set token(value: string) {
        if (this.utilityService.isBrowser()) {
            localStorage.setItem('token', value);
        }
    }
    removeToken() {
        if (this.utilityService.isBrowser()) {
            localStorage.removeItem('token');
        }
    }

    loadUser(): Observable<User> {
        if (!this.obs) {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                token: this.token
            });
            this.obs = this.http.get<User>(`${environment.api}/user`).pipe(
                share()
            );
        }
        this.obs.subscribe(
            _user => {
                if (_user) {
                    this._user = _user;
                    this.status.next(_user);
                } else {
                    this.logout();
                }
            },
            err => {
                console.log('Auth error!', err);
                // this.logout();
            }
        );

        return this.obs;
    }

    get user() {
        return this._user;
    }
    set user(value: User) {
        if (value.id === this._user.id) {
            this._user = value;
        }
    }

    hasPrivilege(key: string, user = this._user): boolean {
        if (!user) {
            return false;
        }

        // if (key.charAt(0) === '!') {
        //     return !Boolean(user.access.privileges.indexOf(key.substr(1)) !== -1);
        // } else {
        //     return Boolean(user.access.privileges.indexOf(key) !== -1);
        // }
        return true;
    }

    /**
     * Check array of privileges and match against logged in user.
     * Prefix privilege with ! to invert e.g. ['!is_admin']
     * @param privileges array of privideges
     * @param matching options "any" | "all"
     */
    hasPrivileges(privileges: string[], matching = 'any', user = this._user) {
        // No privileges required
        if (privileges.length === 0) {
            return true;
        }

        const cntMatching = privileges.filter(privilege => this.hasPrivilege(privilege, user)).length;

        if (matching === 'any' && cntMatching) {
            return true;
        } else if (matching === 'all' && cntMatching === privileges.length) {
            return true;
        } else  {
            return false;
        }
    }

    resetLogoutTimer() {
        if (this.isLoggedIn) {
            this.clearLogoutTimer();
            // const sec = (this._user && this._user.sessionExpirationSecs) ? this._user.sessionExpirationSecs : 900;
            const minute = 60000;
            this.logoutTimer = setTimeout(() => this.logout(), 30 * minute);
        }
    }

    clearLogoutTimer() {
        if (this.logoutTimer) {
            clearTimeout(this.logoutTimer);
        }
    }

    login(username: string, password: string) {
        return this.http.post<User>(`${environment.api}/login`, { username, password }).pipe(
            tap((resp: any) => {
                if (resp.success) {
                    this.token = resp.token;
                    this._user = resp.data;
                    this.resetLogoutTimer();
                    this.status.next(this.user);
                }
            }),
            shareReplay()
        );
    }

    logout(forceRedirect = true) {
        this.removeToken();
        this._user = null;
        this.clearLogoutTimer();
        if (forceRedirect) {
            this.status.next(this.user);
            this.router.navigate(['/login']);
        }
    }

    // getAuthHeader() {
    //     return `Bearer ${localStorage.getItem('token')}`;
    // }


    resetPassword(username: string): Observable<any> {
        return this.http.post(`${environment.api}/user/forgotten-password`, { username });
    }

}
