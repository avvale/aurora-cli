import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EnvironmentsInformationService } from './environments-information.service';
import { EnvironmentsInformation } from './environments-information.types';

@Injectable({
    providedIn: 'root',
})
export class EnvironmentsInformationMockAdapterService extends EnvironmentsInformationService {
    environmentsInformationSubject$: BehaviorSubject<EnvironmentsInformation | null> =
        new BehaviorSubject({
            front: {
                name: 'no-version front',
                version: '0.0.0',
                environment: 'Production',
            },
            back: {
                name: 'no-version back',
                version: '0.0.0',
                environment: 'Production',
            },
        });

    get environmentsInformation$(): Observable<EnvironmentsInformation> {
        return this.environmentsInformationSubject$.asObservable();
    }

    init(): void {
        /**/
    }
}
