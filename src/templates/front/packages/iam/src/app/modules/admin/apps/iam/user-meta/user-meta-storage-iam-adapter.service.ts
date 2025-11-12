import { Injectable } from '@angular/core';
import { GraphQLService, UserMetaStorage } from '@aurora';
import { BehaviorSubject, Observable, first, map, tap } from 'rxjs';
import { findUserMetaById, updateUserMetaByIdMutation } from './user-meta.graphql';
import { UserMetaStorageService } from '@aurora/components/user-meta-storage/user-meta-storage.service'; // no barrel

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

    getUserMeta(
        keyUserMeta: string,
    ): Observable<UserMetaStorage>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                iamFindUserMetaById: UserMetaStorage;
            }>({
                query    : findUserMetaById,
                variables: {
                    id: keyUserMeta,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data.iamFindUserMetaById),
                tap(data => this.metaSubject$.next(data)),
            );
    }

    updateUserMeta(keyUserMeta: string, keyUserMetaValue: any): Observable<void>
    {
        let currentUserMeta = this.metaSubject$.value;

        if (typeof currentUserMeta === 'object')
        {
            currentUserMeta = {
                ...currentUserMeta,
                [keyUserMeta]: keyUserMetaValue,
            };
        }
        else
        {
            // create object if not exist user meta
            currentUserMeta = {
                [keyUserMeta]: keyUserMetaValue,
            };
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
                    payload: {
                        meta,
                    },
                },
            })
            .pipe(
                map(() => undefined),
            );
    }

    clearUserMeta(): Observable<void>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : updateUserMetaByIdMutation,
                variables: {
                    payload: {
                        meta: null,
                    },
                },
            })
            .pipe(
                map(() => undefined),
            );
    }
}