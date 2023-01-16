import { EnvironmentsInformation } from './environments-information.types';
import { BehaviorSubject, Observable } from 'rxjs';

export abstract class EnvironmentsInformationService<T = EnvironmentsInformation>
{
    public environmentsInformationSubject$: BehaviorSubject<EnvironmentsInformation | null> = new BehaviorSubject({
        app: {
            name   : '',
            version: '0.0.0',
        },
        server: {
            name   : '',
            version: '0.0.0',
        },
    });

    abstract get environmentsInformation$(): Observable<T>;

    abstract init(): void;
}
