import { checkMessagesInboxMutation, countUnreadCustomerMessageInboxQuery, deleteCustomerMessageInboxMutation, findCustomerMessageInboxQuery, insertMutation, paginateCustomerMessagesInboxQuery, readCustomerMessageInboxMutation, unreadCustomerMessageInboxMutation } from './inbox.graphql';
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findQuery, getQuery, paginationQuery, updateByIdMutation, updateMutation } from '@apps/message/inbox';
import { MessageCreateInbox, MessageInbox, MessageUpdateInboxById, MessageUpdateInboxes } from '@apps/message/message.types';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { messageCustomerCenterMessageScope } from '../message-center/list/message-center-list.component';
import { messageQuickViewMessagesScope } from '../message-quick-view/message-quick-view.component';

@Injectable({
    providedIn: 'root',
})
export class InboxService
{
    paginationSubject$: BehaviorSubject<GridData<MessageInbox> | null> = new BehaviorSubject(null);
    inboxSubject$: BehaviorSubject<MessageInbox | null> = new BehaviorSubject(null);
    inboxesSubject$: BehaviorSubject<MessageInbox[] | null> = new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: { [key: string]: BehaviorSubject<GridData<MessageInbox> | null>; } = {};
    inboxScoped: { [key: string]: BehaviorSubject<MessageInbox | null>; } = {};
    inboxesScoped: { [key: string]: BehaviorSubject<MessageInbox[] | null>; } = {};

    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<MessageInbox>>
    {
        return this.paginationSubject$.asObservable();
    }

    get inbox$(): Observable<MessageInbox>
    {
        return this.inboxSubject$.asObservable();
    }

    get inboxes$(): Observable<MessageInbox[]>
    {
        return this.inboxesSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(scope: string, pagination: GridData<MessageInbox>): void
    {
        if (this.paginationScoped[scope])
        {
            this.paginationScoped[scope].next(pagination);
            return;
        }
        // create new subject if not exist
        this.paginationScoped[scope] = new BehaviorSubject(pagination);
    }

    // get pagination observable by scope
    getScopePagination(scope: string): Observable<GridData<MessageInbox>>
    {
        if (this.paginationScoped[scope]) return this.paginationScoped[scope].asObservable();
        return null;
    }

    setScopeInbox(scope: string, object: MessageInbox): void
    {
        if (this.inboxScoped[scope])
        {
            this.inboxScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.inboxScoped[scope] = new BehaviorSubject(object);
    }

    getScopeInbox(scope: string): Observable<MessageInbox>
    {
        if (this.inboxScoped[scope]) return this.inboxScoped[scope].asObservable();
        return null;
    }

    setScopeInboxes(scope: string, objects: MessageInbox[]): void
    {
        if (this.inboxesScoped[scope])
        {
            this.inboxesScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.inboxesScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeInboxes(scope: string): Observable<MessageInbox[]>
    {
        if (this.inboxesScoped[scope]) return this.inboxesScoped[scope].asObservable();
        return null;
    }

    pagination(
        {
            graphqlStatement = paginationQuery,
            query = {},
            constraint = {},
            headers = {},
            scope,
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            scope?: string;
        } = {},
    ): Observable<GridData<MessageInbox>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<MessageInbox>; }>({
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
                tap(pagination => scope ? this.setScopePagination(scope, pagination) : this.paginationSubject$.next(pagination)),
            );
    }

    findById(
        {
            graphqlStatement = findByIdQuery,
            id = null,
            constraint = {},
            headers = {},
            scope,
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            scope?: string;
        } = {},
    ): Observable<{
        object: MessageInbox;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: MessageInbox;
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
                tap(data => scope ? this.setScopeInbox(scope, data.object) : this.inboxSubject$.next(data.object)),
            );
    }

    find(
        {
            graphqlStatement = findQuery,
            query = {},
            constraint = {},
            headers = {},
            scope,
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            scope?: string;
        } = {},
    ): Observable<{
        object: MessageInbox;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: MessageInbox;
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
                tap(data => scope ? this.setScopeInbox(scope, data.object) : this.inboxSubject$.next(data.object)),
            );
    }

    get(
        {
            graphqlStatement = getQuery,
            query = {},
            constraint = {},
            headers = {},
            scope,
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            scope?: string;
        } = {},
    ): Observable<{
        objects: MessageInbox[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: MessageInbox[];
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
                tap(data => scope ? this.setScopeInboxes(scope, data.objects) : this.inboxesSubject$.next(data.objects)),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: MessageCreateInbox;
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

    insert<T>(
        {
            graphqlStatement = insertMutation,
            objects = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            objects?: MessageCreateInbox[];
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: objects,
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
            object?: MessageUpdateInboxById;
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
            object?: MessageUpdateInboxes;
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
            id = null,
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

    // Queries additionalApis
    paginateCustomerCenterMessagesInbox(
        {
            graphqlStatement = paginateCustomerMessagesInboxQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<GridData<MessageInbox>>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                pagination: GridData<MessageInbox>;
            }>({
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
                tap(pagination => this.setScopePagination(messageCustomerCenterMessageScope, pagination)),
            );
    }

    paginateCustomerQuickVewMessagesInbox(
        {
            graphqlStatement = paginateCustomerMessagesInboxQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<GridData<MessageInbox>>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                pagination: GridData<MessageInbox>;
            }>({
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
                tap(pagination => this.setScopePagination(messageQuickViewMessagesScope, pagination)),
            );
    }

    findCustomerMessageInbox(
        {
            graphqlStatement = findCustomerMessageInboxQuery,
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
        object: MessageInbox;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: MessageInbox;
            }>({
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
                map(result => result.data),
                tap(data => this.setScopeInbox(messageCustomerCenterMessageScope, data.object)),
            );
    }

    countUnreadCustomerMessageInbox(
        {
            graphqlStatement = countUnreadCustomerMessageInboxQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<number>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                messageCountUnreadCustomerMessageInbox: number;
            }>({
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
                map(result => result.data.messageCountUnreadCustomerMessageInbox),
            );
    }

    // Mutation additionalApis
    checkMessagesInbox<T>(
        {
            graphqlStatement = checkMessagesInboxMutation,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        // check messages in outbox and copy to inbox
        return this.graphqlService
            .client()
            .mutate({
                mutation: graphqlStatement,
                context : {
                    headers,
                },
            });
    }

    deleteCustomerMessageInbox<T>(
        {
            graphqlStatement = deleteCustomerMessageInboxMutation,
            id,
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

    readCustomerMessageInbox<T>(
        {
            graphqlStatement = readCustomerMessageInboxMutation,
            inbox = null,
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            inbox?: MessageUpdateInboxById;
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
                    inbox,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }

    unreadCustomerMessageInbox<T>(
        {
            graphqlStatement = unreadCustomerMessageInboxMutation,
            inbox = null,
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            inbox?: MessageUpdateInboxById;
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
                    inbox,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }
}
