import { Injectable } from '@angular/core';
import { log } from '@aurora';
import { Session } from '@aurora/aurora.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root',
})
export class SessionLocalStorageService extends SessionService
{
    private sessionName: string = 'session';

    dataSubject$: BehaviorSubject<Session | null> = new BehaviorSubject(null);

    get data$(): Observable<Session>
    {
        return this.dataSubject$.asObservable();
    }

    initSession(): void
    {
        const session = this.getSession();

        log('[DEBUG] Session initialized: ', session);

        this.dataSubject$.next(session);
    }

    getSession(): Session | null
    {
        const value = localStorage.getItem(this.sessionName);

        // check value is not null
        if (value) return JSON.parse(atob(value)) as Session;
        return null;
    }

    updateSession(keySession: string, keySessionValue: any): void
    {
        let currentSession = this.dataSubject$.value;

        if (typeof currentSession === 'object')
        {
            currentSession = { ...currentSession, [keySession]: keySessionValue };
        }
        else
        {
            // create object if not exist session
            currentSession = { [keySession]: keySessionValue };
        }

        this.saveSession(currentSession);
    }

    saveSession(data: Session): void
    {
        if (data)
        {
            localStorage.setItem(
                this.sessionName,
                btoa(JSON.stringify(data)),
            );
            this.dataSubject$.next(data);
        }
    }

    clearSession(): void
    {
        localStorage.removeItem(this.sessionName);
        this.dataSubject$.next(null);
    }
}
