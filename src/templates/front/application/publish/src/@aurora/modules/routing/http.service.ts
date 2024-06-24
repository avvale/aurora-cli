import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RouteRepositoryService } from './route-repository.service';

@Injectable({
    providedIn: 'root',
})
export class HttpService
{
    constructor(
        private http: HttpClient,
        private routeRepositoryService: RouteRepositoryService,
    ) { }

    head<T>(
        routeName: string,
        params?: {[key: string]: string;},
        options?: {
            headers?: HttpHeaders | {
                [header: string]: string | string[];
            };
            observe?: 'body';
            params?: HttpParams | {
                [param: string]: string | string[];
            };
            reportProgress?: boolean;
            responseType?: 'json';
            withCredentials?: boolean;
        },
    ): Observable<T>
    {
        return this.http.head<T>(this.routeRepositoryService.route(routeName, params), options);
    }

    delete<T>(
        routeName: string,
        params?: {[key: string]: string;},
        options?: {
            headers?: HttpHeaders | {
                [header: string]: string | string[];
            };
            observe?: 'body';
            params?: HttpParams | {
                [param: string]: string | string[];
            };
            reportProgress?: boolean;
            responseType?: 'json';
            withCredentials?: boolean;
        },
    ): Observable<T>
    {
        return this.http.delete<T>(this.routeRepositoryService.route(routeName, params), options);
    }

    get<T>(
        routeName: string,
        params?: {[key: string]: string;},
        options?: {
            headers?: HttpHeaders | {
                [header: string]: string | string[];
            };
            observe?: 'body';
            params?: HttpParams | {
                [param: string]: string | string[];
            };
            reportProgress?: boolean;
            responseType?: 'json';
            withCredentials?: boolean;
        },
    ): Observable<T>
    {
        return this.http.get<T>(this.routeRepositoryService.route(routeName, params), options);
    }

    options<T>(
        routeName: string,
        params?: {[key: string]: string;},
        options?: {
            headers?: HttpHeaders | {
                [header: string]: string | string[];
            };
            observe?: 'body';
            params?: HttpParams | {
                [param: string]: string | string[];
            };
            reportProgress?: boolean;
            responseType?: 'json';
            withCredentials?: boolean;
        },
    ): Observable<T>
    {
        return this.http.options<T>(this.routeRepositoryService.route(routeName, params), options);
    }

    post<T>(
        routeName: string,
        params?: {[key: string]: string;},
        body?: any | null,
        options?: {
            headers?: HttpHeaders | {
                [header: string]: string | string[];
            };
            observe?: 'body';
            params?: HttpParams | {
                [param: string]: string | string[];
            };
            reportProgress?: boolean;
            responseType?: 'json';
            withCredentials?: boolean;
        },
    ): Observable<T>
    {
        return this.http.post<T>(this.routeRepositoryService.route(routeName, params), body, options);
    }

    patch<T>(
        routeName: string,
        params?: {[key: string]: string;},
        body?: any | null,
        options?: {
            headers?: HttpHeaders | {
                [header: string]: string | string[];
            };
            observe?: 'body';
            params?: HttpParams | {
                [param: string]: string | string[];
            };
            reportProgress?: boolean;
            responseType?: 'json';
            withCredentials?: boolean;
        },
    ): Observable<T>
    {
        return this.http.patch<T>(this.routeRepositoryService.route(routeName, params), body, options);
    }

    put<T>(
        routeName: string,
        params?: {[key: string]: string;},
        body?: any | null,
        options?: {
            headers?: HttpHeaders | {
                [header: string]: string | string[];
            };
            observe?: 'body';
            params?: HttpParams | {
                [param: string]: string | string[];
            };
            reportProgress?: boolean;
            responseType?: 'json';
            withCredentials?: boolean;
        },
    ): Observable<T>
    {
        return this.http.put<T>(this.routeRepositoryService.route(routeName, params), body, options);
    }
}
