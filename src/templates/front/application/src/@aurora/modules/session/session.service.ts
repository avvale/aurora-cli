import { Session } from '@aurora/aurora.types';
import { BehaviorSubject, Observable } from 'rxjs';

export abstract class SessionService<T = Session>
{
    dataSubject$: BehaviorSubject<T | null> = new BehaviorSubject(null);

    get data$(): Observable<T>
    {
        return this.dataSubject$.asObservable();
    }

    abstract initSession(): void;

    abstract getSession(): T | null;

    abstract updateSession(id: string, session: T | null): void;

    abstract saveSession(session: T | null): void;

    abstract clearSession(): void;
}
