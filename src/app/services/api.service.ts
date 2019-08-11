import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';


const removeSlashes = (url: string): string => {
    if (!url) {
        return url;
    }

    if (url.startsWith('/')) {
        url = url.slice(1, url.length);
    }

    if (url.endsWith('/')) {
        url = url.slice(0, url.length - 1);
    }

    return url;
};

/**
 * This class provides the api service.
 */
@Injectable()
export class ApiService {

    basePath: string = environment.api;
    endpoint = '';
    idAttribute = 'id';

    /**
     * Creates a new ApiService with the injected Http.
     * @param http - The injected Http.
     */
    constructor(
        public http: HttpClient
    ) {}

    public get(url: string|string[] = '', options?: any): Observable<any> {
        return this.http.get(this.createUrl(url), options).pipe(
            catchError((error: any) => this._catchError(error))
        );
    }

    public put(url: string|string[], data?: any, options?: any): Observable<any> {
        return this.http.put(this.createUrl(url), data, options).pipe(
            catchError((error: any) => this._catchError(error))
        );
    }

    public patch(url: string|string[], data?: any, options?: any): Observable<any> {
        return this.http.patch(this.createUrl(url), data, options).pipe(
            catchError((error: any) => this._catchError(error))
        );
    }

    public post(url: string|string[] = '', data?: any, options?: any): Observable<any> {
        return this.http.post(this.createUrl(url), data, options).pipe(
            catchError((error: any) => this._catchError(error))
        );
    }

    public delete(url: string|string[], options?: any): Observable<any> {
        return this.http.delete(this.createUrl(url), options).pipe(
            catchError((error: any) => this._catchError(error))
        );
    }

    public find(id: number|string|any, params?: any) {
        if (typeof id === 'undefined') {
            throw new Error('You must provide an id');
        }

        return this.get([id as string], params);
    }

    public findAll(params?: any) {
        return this.get('', params);
    }

    public create(data?: any, params?: any) {
        return this.post('', data, params);
    }

    public update(data: any, params?: any) {
        const id = data[this.idAttribute];
        const url = id ? id : '';

        return this.put([url], data, params);
    }

    public destroy(id?: number|string, params?: any) {
        if (typeof id === 'object') {
            params = id;
            id = null;
        }

        return this.delete([id ? id as string : ''], params);
    }


    public createUrl(url: string|string[]): string {
        const queryUrl = String(Array.isArray(url) ? url.join('/') : url);
        const urlSegments: string[] = [
            removeSlashes(this.basePath),
            removeSlashes(this.endpoint),
            removeSlashes(queryUrl)
        ];
        return urlSegments.filter(String).join('/');
    }

    private _catchError(error: any): any {
        if (error instanceof Error) {
            throw error;
        } else {
            return throwError(error);
        }
    }
}
