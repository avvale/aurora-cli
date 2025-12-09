/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import packageFile from '../../../../package.json';
import {
    EnvironmentInformation,
    EnvironmentsInformation,
} from './environments-information.types';

@Injectable({
    providedIn: 'root',
})
export class EnvironmentsInformationService {
    environmentsInformationSubject$: BehaviorSubject<EnvironmentsInformation | null> =
        new BehaviorSubject({
            front: {
                name: '',
                version: '0.0.0',
                environment: 'Production',
            },
            back: {
                name: '',
                version: '0.0.0',
                environment: 'Production',
            },
        });

    get environmentsInformation$(): Observable<EnvironmentsInformation> {
        return this.environmentsInformationSubject$.asObservable();
    }

    constructor(private http: HttpClient) {
        this.init();
    }

    init(): void {
        this.http
            .get<EnvironmentInformation>(
                `${environment.api.rest}/core/environment-information`,
            )
            .subscribe((environmentInformationServer) => {
                this.environmentsInformationSubject$.next({
                    front: {
                        name: packageFile.name,
                        version: packageFile.version,
                        environment: environmentInformationServer.environment,
                    },
                    back: environmentInformationServer,
                });
            });
    }
}
