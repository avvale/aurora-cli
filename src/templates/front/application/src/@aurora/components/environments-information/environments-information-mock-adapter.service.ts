import { Injectable } from '@angular/core';
import { EnvironmentsInformation } from './environments-information.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { EnvironmentsInformationService } from './environments-information.service';

@Injectable({
    providedIn: 'root',
})
export class EnvironmentsInformationMockAdapterService extends EnvironmentsInformationService
{
    environmentsInformationSubject$: BehaviorSubject<EnvironmentsInformation | null> = new BehaviorSubject({
        app: {
            name   : 'no-version front',
            version: '0.0.0',
        },
        server: {
            name   : 'no-version back',
            version: '0.0.0',
        },
    });

    get environmentsInformation$(): Observable<EnvironmentsInformation>
    {
        return this.environmentsInformationSubject$.asObservable();
    }

    init(): void
    {
        /**/
    }
}
