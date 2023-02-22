import { Injectable } from '@angular/core';
import { SessionService, UserMetaStorage } from '@aurora';
import { BehaviorSubject, map, Observable, of, Subject } from 'rxjs';
import { UserMetaStorageService } from './user-meta-storage.service';

@Injectable({
    providedIn: 'root',
})
export class UserMetaStorageLocalStorageAdapterService extends UserMetaStorageService
{
    metaSubject$: BehaviorSubject<UserMetaStorage | null> = new BehaviorSubject(null);
    unsubscribeAll$: Subject<void> = new Subject();
    nameStorage: 'userMeta';

    get meta$(): Observable<UserMetaStorage>
    {
        return this.metaSubject$.asObservable();
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
        let currentUserMeta = this.metaSubject$.value;

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
        this.metaSubject$.next(currentUserMeta);

        return this.getUserMeta()
            .pipe(
                map(() => undefined),
            );
    }

    saveUserMeta(userMeta: UserMetaStorage): Observable<void>
    {
        this.sessionService.updateSession(this.nameStorage, userMeta);
        this.metaSubject$.next(userMeta);

        return this.getUserMeta()
            .pipe(
                map(() => undefined),
            );
    }

    clearUserMeta(): Observable<void>
    {
        this.sessionService.updateSession(this.nameStorage, null);
        this.metaSubject$.next(null);

        return this.getUserMeta()
            .pipe(
                map(() => undefined),
            );
    }
}