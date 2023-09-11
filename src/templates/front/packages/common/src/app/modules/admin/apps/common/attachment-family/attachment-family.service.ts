import { CommonAttachmentFamily, CommonCreateAttachmentFamily, CommonResource, CommonUpdateAttachmentFamilies, CommonUpdateAttachmentFamilyById } from '../common.types';
import { ResourceService } from '../resource/resource.service';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findByIdWithRelationsQuery, findQuery, getQuery, getRelations, paginationQuery, updateByIdMutation, updateMutation } from './attachment-family.graphql';
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AttachmentFamilyService
{
    paginationSubject$: BehaviorSubject<GridData<CommonAttachmentFamily> | null> = new BehaviorSubject(null);
    attachmentFamilySubject$: BehaviorSubject<CommonAttachmentFamily | null> = new BehaviorSubject(null);
    attachmentFamiliesSubject$: BehaviorSubject<CommonAttachmentFamily[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly resourceService: ResourceService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<CommonAttachmentFamily>>
    {
        return this.paginationSubject$.asObservable();
    }

    get attachmentFamily$(): Observable<CommonAttachmentFamily>
    {
        return this.attachmentFamilySubject$.asObservable();
    }

    get attachmentFamilies$(): Observable<CommonAttachmentFamily[]>
    {
        return this.attachmentFamiliesSubject$.asObservable();
    }

    pagination(
        {
            graphqlStatement = paginationQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<GridData<CommonAttachmentFamily>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<CommonAttachmentFamily>; }>({
                query    : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data.pagination),
                tap(pagination => this.paginationSubject$.next(pagination)),
            );
    }

    findById(
        {
            graphqlStatement = findByIdQuery,
            id = '',
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        object: CommonAttachmentFamily;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: CommonAttachmentFamily;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.attachmentFamilySubject$.next(data.object);
                }),
            );
    }

    findByIdWithRelations(
        {
            graphqlStatement = findByIdWithRelationsQuery,
            id = '',
            constraint = {},
            headers = {},
            queryResources = {},
            constraintResources = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            queryResources?: QueryStatement;
            constraintResources?: QueryStatement;
        } = {},
    ): Observable<{
        object: CommonAttachmentFamily;
        commonGetResources: CommonResource[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: CommonAttachmentFamily;
                commonGetResources: CommonResource[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryResources,
                    constraintResources,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.attachmentFamilySubject$.next(data.object);
                    this.resourceService.resourcesSubject$.next(data.commonGetResources);
                }),
            );
    }

    find(
        {
            graphqlStatement = findQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        object: CommonAttachmentFamily;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: CommonAttachmentFamily;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.attachmentFamilySubject$.next(data.object);
                }),
            );
    }

    get(
        {
            graphqlStatement = getQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        objects: CommonAttachmentFamily[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: CommonAttachmentFamily[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.attachmentFamiliesSubject$.next(data.objects);
                }),
            );
    }

    getRelations(
        {
            queryResources = {},
            constraintResources = {},
            headers = {},
        }: {
            queryResources?: QueryStatement;
            constraintResources?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        commonGetResources: CommonResource[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                commonGetResources: CommonResource[];
            }>({
                query    : getRelations,
                variables: {
                    queryResources,
                    constraintResources,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.resourceService.resourcesSubject$.next(data.commonGetResources);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: CommonCreateAttachmentFamily;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                },
                context: {
                    headers,
                },
            });
    }

    updateById<T>(
        {
            graphqlStatement = updateByIdMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: CommonUpdateAttachmentFamilyById;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                },
                context: {
                    headers,
                },
            });
    }

    update<T>(
        {
            graphqlStatement = updateMutation,
            object = null,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: CommonUpdateAttachmentFamilies;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }

    deleteById<T>(
        {
            graphqlStatement = deleteByIdMutation,
            id = '',
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    id,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }

    delete<T>(
        {
            graphqlStatement = deleteMutation,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }
}