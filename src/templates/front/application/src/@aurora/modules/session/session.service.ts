import { Session } from '@aurora';
import { BehaviorSubject, Observable } from 'rxjs';

export abstract class SessionService<T = Session>
{
    dataSubject$: BehaviorSubject<T | null> = new BehaviorSubject(null);

    get data$(): Observable<T>
    {
        return this.dataSubject$.asObservable();
    }

    abstract get session(): Session | null;

    abstract init(): void;

    abstract get<E = any>(id: string): E | null;

    abstract set<E = any>(id: string, value: E): void;

    abstract save(session: T | null): void;

    abstract clear(): void;
}
