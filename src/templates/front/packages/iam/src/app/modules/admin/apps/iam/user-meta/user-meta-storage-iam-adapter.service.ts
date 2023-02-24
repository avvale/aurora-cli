import { Injectable } from '@angular/core';
import { GraphQLService, UserMetaStorage, UserMetaStorageService } from '@aurora';
import { BehaviorSubject, first, map, mapTo, Observable, tap } from 'rxjs';
import { findUserMetaById, updateUserMetaByIdMutation } from './user-meta.graphql';

@Injectable({
    providedIn: 'root',
})
export class UserMetaStorageIamAdapterService extends UserMetaStorageService
{
    metaSubject$: BehaviorSubject<UserMetaStorage | null> = new BehaviorSubject(null);

    get meta$(): Observable<UserMetaStorage>
    {
        return this.metaSubject$.asObservable();
    }

    constructor(
        private graphqlService: GraphQLService,
    )
    {
        super();
    }

    getUserMeta(keyUserMeta: string): Observable<UserMetaStorage>
    {
        return this.graphqlService
            .client()
            .watchQuery<{ iamGetUserMeta: UserMetaStorage; }>({
                query    : findUserMetaById,
                variables: { id: keyUserMeta },
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: { iamGetUserMeta: UserMetaStorage; };}, UserMetaStorage>(result => result.data.iamGetUserMeta),
                tap((iamGetUserMeta: UserMetaStorage) => this.metaSubject$.next(iamGetUserMeta)),
            );
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
            // create object if not exist user meta
            currentUserMeta = { [keyUserMeta]: keyUserMetaValue };
        }

        return this.saveUserMeta(currentUserMeta);
    }

    saveUserMeta(meta: UserMetaStorage): Observable<void>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : updateUserMetaByIdMutation,
                variables: {
                    payload: { meta },
                },
            })
            .pipe(
                mapTo(undefined),
            );
    }

    clearUserMeta(): Observable<void>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : updateUserMetaByIdMutation,
                variables: {
                    payload: { meta: null },
                },
            })
            .pipe(
                mapTo(undefined),
            );
    }
}