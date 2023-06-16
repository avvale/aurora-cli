import { Injectable } from '@angular/core';
import { SessionService, UserMetaStorage } from '@aurora';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { UserMetaStorageService } from './user-meta-storage.service';

@Injectable({
    providedIn: 'root',
})
export class UserMetaStorageLocalStorageAdapterService extends UserMetaStorageService
{
    metaSubject$: BehaviorSubject<UserMetaStorage | null> = new BehaviorSubject(null);
    unsubscribeAll$: Subject<void> = new Subject();
    nameStorage: string = 'userMeta';

    get meta$(): Observable<UserMetaStorage>
    {
        return this.metaSubject$.asObservable();
    }

    constructor(
        private sessionService: SessionService,
    )
    {
        super();
        this.metaSubject$.next(this.getUserMetaFromStorage());
    }

    private getUserMetaFromStorage(): UserMetaStorage
    {
        return this.sessionService.get(this.nameStorage);
    }

    getUserMeta(): Observable<UserMetaStorage>
    {
        return of(this.getUserMetaFromStorage());
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

        this.sessionService.set(this.nameStorage, currentUserMeta);
        this.metaSubject$.next(currentUserMeta);

        return of(undefined);
    }

    saveUserMeta(userMeta: UserMetaStorage): Observable<void>
    {
        this.sessionService.set(this.nameStorage, userMeta);
        this.metaSubject$.next(userMeta);

        return of(undefined);
    }

    clearUserMeta(): Observable<void>
    {
        this.sessionService.set(this.nameStorage, null);
        this.metaSubject$.next(null);

        return of(undefined);
    }
}