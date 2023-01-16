import { Injectable } from '@angular/core';
import { SessionService, UserMetaStorage, UserMetaStorageService } from '@aurora';
import { BehaviorSubject, map, Observable, of, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserMetaStorageLocalStorageService extends UserMetaStorageService
{
    dataSubject$: BehaviorSubject<UserMetaStorage | null> = new BehaviorSubject(null);
    unsubscribeAll$: Subject<void> = new Subject();
    nameStorage: 'userMeta';

    get data$(): Observable<UserMetaStorage>
    {
        return this.dataSubject$.asObservable();
    }

    constructor(
        private sessionService: SessionService,
    )
    {
        super();
    }

    getUserMeta(): Observable<UserMetaStorage>
    {
        const session = this.sessionService.getSession();
        return of(session[this.nameStorage]);
    }

    updateUserMeta(keyUserMeta: string, keyUserMetaValue: any): Observable<void>
    {
        let currentUserMeta = this.dataSubject$.value;

        if (typeof currentUserMeta === 'object')
        {
            currentUserMeta = { ...currentUserMeta, [keyUserMeta]: keyUserMetaValue };
        }
        else
        {
            // create object if not exist user data
            currentUserMeta = { [keyUserMeta]: keyUserMetaValue };
        }

        this.sessionService.updateSession(this.nameStorage, currentUserMeta);
        this.dataSubject$.next(currentUserMeta);

        return this.getUserMeta()
            .pipe(
                map(() => undefined),
            );
    }

    saveUserMeta(userMeta: UserMetaStorage): Observable<void>
    {
        this.sessionService.updateSession(this.nameStorage, userMeta);
        this.dataSubject$.next(userMeta);

        return this.getUserMeta()
            .pipe(
                map(() => undefined),
            );
    }

    clearUserMeta(): Observable<void>
    {
        this.sessionService.updateSession(this.nameStorage, null);
        this.dataSubject$.next(null);

        return this.getUserMeta()
            .pipe(
                map(() => undefined),
            );
    }
}