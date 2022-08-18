import { Injectable } from '@angular/core';
import { SessionService, UserDataStorage, UserDataStorageService } from '@aurora';
import { BehaviorSubject, map, Observable, of, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserDataStorageLocalStorageService extends UserDataStorageService
{
    dataSubject$: BehaviorSubject<UserDataStorage | null> = new BehaviorSubject(null);
    unsubscribeAll$: Subject<void> = new Subject();
    nameStorage: 'userData';

    get data$(): Observable<UserDataStorage>
    {
        return this.dataSubject$.asObservable();
    }

    constructor(
        private sessionService: SessionService,
    )
    {
        super();
    }

    getUserData(): Observable<UserDataStorage>
    {
        const session = this.sessionService.getSession();
        return of(session[this.nameStorage]);
    }

    updateUserData(keyUserData: string, keyUserDataValue: any): Observable<void>
    {
        let currentUserData = this.dataSubject$.value;

        if (typeof currentUserData === 'object')
        {
            currentUserData = { ...currentUserData, [keyUserData]: keyUserDataValue };
        }
        else
        {
            // create object if not exist user data
            currentUserData = { [keyUserData]: keyUserDataValue };
        }

        this.sessionService.updateSession(this.nameStorage, currentUserData);
        this.dataSubject$.next(currentUserData);

        return this.getUserData()
            .pipe(
                map(() => undefined),
            );
    }

    saveUserData(userData: UserDataStorage): Observable<void>
    {
        this.sessionService.updateSession(this.nameStorage, userData);
        this.dataSubject$.next(userData);

        return this.getUserData()
            .pipe(
                map(() => undefined),
            );
    }

    clearUserData(): Observable<void>
    {
        this.sessionService.updateSession(this.nameStorage, null);
        this.dataSubject$.next(null);

        return this.getUserData()
            .pipe(
                map(() => undefined),
            );
    }
}