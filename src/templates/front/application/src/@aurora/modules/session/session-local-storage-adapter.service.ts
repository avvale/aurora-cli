import { Injectable } from '@angular/core';
import { CoreGetLangsService, log } from '@aurora';
import { Session } from '@aurora';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root',
})
export class SessionLocalStorageService extends SessionService
{
    private sessionName: string = 'session';

    dataSubject$: BehaviorSubject<Session | null> = new BehaviorSubject(null);

    constructor(
        private readonly coreGetLangsService: CoreGetLangsService,
    )
    {
        super();
    }

    get data$(): Observable<Session>
    {
        return this.dataSubject$.asObservable();
    }

    get session(): Session | null
    {
        const value = localStorage.getItem(this.sessionName);

        // check value is not null
        if (value) return JSON.parse(atob(value)) as Session;
        return null;
    }

    init(): void
    {
        log('[DEBUG] Session initialized: ', this.session);
        this.dataSubject$.next(this.session);
    }

    // function to load the minimum data for
    // the correct operation of the application
    async loadMinimumData(): Promise<void>
    {
        if (
            this.get('langs') &&
            Array.isArray(this.get('langs')) &&
            this.get('fallbackLang') &&
            this.get('searchKeyLang')
        )
        {
            // set coreGetLangsService data from session
            this.coreGetLangsService.langsSubject$.next(this.get('langs'));
            this.coreGetLangsService.fallbackLangSubject$.next(this.get('fallbackLang'));
            this.coreGetLangsService.searchKeyLangSubject$.next(this.get('searchKeyLang'));

            return;
        }

        log('[DEBUG] Load minimum data in session');

        // set coreGetLangsService data from database and save in session
        const data = await lastValueFrom(this.coreGetLangsService.get());
        this.set('langs', data.langs);
        this.set('fallbackLang', data.fallbackLang);
        this.set('searchKeyLang', data.searchKeyLang);
    }

    get<T>(id: string): T | null
    {
        const value = localStorage.getItem(this.sessionName);

        // check value is not null
        if (value) return (JSON.parse(atob(value)) as Session)[id];
        return null;
    }

    set(keySession: string, keySessionValue: any): void
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

        this.save(currentSession);
    }

    save(data: Session): void
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

    clear(): void
    {
        localStorage.removeItem(this.sessionName);
        this.dataSubject$.next(null);
    }
}
