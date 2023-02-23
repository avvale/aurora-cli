/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { EnvironmentInformation, EnvironmentsInformation } from './environments-information.types';
import { BehaviorSubject, Observable } from 'rxjs';
import packageFile from '../../../../package.json';

@Injectable({
    providedIn: 'root',
})
export class EnvironmentsInformationService
{
    environmentsInformationSubject$: BehaviorSubject<EnvironmentsInformation | null> = new BehaviorSubject({
        app: {
            name   : '',
            version: '0.0.0',
        },
        server: {
            name   : '',
            version: '0.0.0',
        },
    });

    get environmentsInformation$(): Observable<EnvironmentsInformation>
    {
        return this.environmentsInformationSubject$.asObservable();
    }

    constructor(
        private http: HttpClient,
    )
    {
        this.init();
    }

    init(): void
    {
        this.http
            .get<EnvironmentInformation>(`${environment.api.rest}/core/environment-information`)
            .subscribe(environmentInformationServer =>
            {
                this.environmentsInformationSubject$.next({
                    app: {
                        name   : packageFile.name,
                        version: packageFile.version,
                    },
                    server: environmentInformationServer,
                });
            });
    }
}