import { Injectable } from '@angular/core';
import { DocumentNode } from '@apollo/client/core';
import { GraphQLHeaders, GraphQLService } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import {
    getFoldersQuery,
    getListsQuery,
    getSpacesQuery,
} from './clickup.graphql';
import { ClickupFolder, ClickupList, ClickupSpace } from './clickup.types';

export const CLICKUP_TASK_PLATFORM_API_KEY = 'CLICKUP_TASK_PLATFORM_API_KEY';
export const CLICKUP_TASK_PLATFORM_FOLDER_ID =
    'CLICKUP_TASK_PLATFORM_FOLDER_ID';
export const CLICKUP_TASK_PLATFORM_LIST_ID = 'CLICKUP_TASK_PLATFORM_LIST_ID';
export const CLICKUP_TASK_PLATFORM_SPACE_ID = 'CLICKUP_TASK_PLATFORM_SPACE_ID';
export const CLICKUP_TASK_PLATFORM_TEAM_ID = 'CLICKUP_TASK_PLATFORM_TEAM_ID';
export const CLICKUP_TASK_PLATFORM_WEBHOOK_ID =
    'CLICKUP_TASK_PLATFORM_WEBHOOK_ID';

@Injectable({
    providedIn: 'root',
})
export class ClickupService {
    spacesSubject$: BehaviorSubject<ClickupSpace[] | null> =
        new BehaviorSubject(null);
    foldersSubject$: BehaviorSubject<ClickupFolder[] | null> =
        new BehaviorSubject(null);
    listsSubject$: BehaviorSubject<ClickupList[] | null> = new BehaviorSubject(
        null,
    );

    constructor(private readonly graphqlService: GraphQLService) {}

    /**
     * Getters
     */
    get spaces$(): Observable<ClickupSpace[]> {
        return this.spacesSubject$.asObservable();
    }

    get folders$(): Observable<ClickupFolder[]> {
        return this.foldersSubject$.asObservable();
    }

    get lists$(): Observable<ClickupList[]> {
        return this.listsSubject$.asObservable();
    }

    getSpaces({
        graphqlStatement = getSpacesQuery,
        teamId = null,
        headers = {},
        scope,
    }: {
        graphqlStatement?: DocumentNode;
        teamId?: string;
        headers?: GraphQLHeaders;
        scope?: string;
    } = {}): Observable<{
        clickupSpaces: ClickupSpace[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                clickupSpaces: ClickupSpace[];
            }>({
                query: graphqlStatement,
                variables: {
                    teamId,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) => this.spacesSubject$.next(data.clickupSpaces)),
            );
    }

    getFolders({
        graphqlStatement = getFoldersQuery,
        spaceId = null,
        headers = {},
        scope,
    }: {
        graphqlStatement?: DocumentNode;
        spaceId?: string;
        headers?: GraphQLHeaders;
        scope?: string;
    } = {}): Observable<{
        clickupFolders: ClickupFolder[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                clickupFolders: ClickupFolder[];
            }>({
                query: graphqlStatement,
                variables: {
                    spaceId,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) => this.foldersSubject$.next(data.clickupFolders)),
            );
    }

    getLists({
        graphqlStatement = getListsQuery,
        folderId = null,
        headers = {},
        scope,
    }: {
        graphqlStatement?: DocumentNode;
        folderId?: string;
        headers?: GraphQLHeaders;
        scope?: string;
    } = {}): Observable<{
        clickupLists: ClickupList[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                clickupLists: ClickupList[];
            }>({
                query: graphqlStatement,
                variables: {
                    folderId,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) => this.listsSubject$.next(data.clickupLists)),
            );
    }
}
