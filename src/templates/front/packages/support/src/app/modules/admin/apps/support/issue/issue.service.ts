import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    SupportCreateIssue,
    SupportIssue,
    SupportUpdateIssueById,
    SupportUpdateIssues,
} from '@apps/support';
import {
    createMutation,
    deleteByIdMutation,
    deleteMutation,
    fields,
    findByIdQuery,
    findQuery,
    getQuery,
    insertMutation,
    paginationQuery,
    updateByIdMutation,
    updateMutation,
} from '@apps/support/issue';
import { ToolsWebhook } from '@apps/tools';
import {
    GraphQLHeaders,
    GraphQLService,
    GridData,
    parseGqlFields,
    QueryStatement,
} from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import {
    createWebhookConfigMutation,
    deleteWebhookConfigMutation,
} from './issue.graphql';

@Injectable({
    providedIn: 'root',
})
export class IssueService {
    paginationSubject$: BehaviorSubject<GridData<SupportIssue> | null> =
        new BehaviorSubject(null);
    issueSubject$: BehaviorSubject<SupportIssue | null> = new BehaviorSubject(
        null,
    );
    issuesSubject$: BehaviorSubject<SupportIssue[] | null> =
        new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [key: string]: BehaviorSubject<GridData<SupportIssue> | null>;
    } = {};
    issueScoped: { [key: string]: BehaviorSubject<SupportIssue | null> } = {};
    issuesScoped: { [key: string]: BehaviorSubject<SupportIssue[] | null> } =
        {};

    constructor(private readonly graphqlService: GraphQLService) {}

    /**
     * Getters
     */
    get pagination$(): Observable<GridData<SupportIssue>> {
        return this.paginationSubject$.asObservable();
    }

    get issue$(): Observable<SupportIssue> {
        return this.issueSubject$.asObservable();
    }

    get issues$(): Observable<SupportIssue[]> {
        return this.issuesSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<SupportIssue>,
    ): void {
        if (this.paginationScoped[scope]) {
            this.paginationScoped[scope].next(pagination);
            return;
        }
        // create new subject if not exist
        this.paginationScoped[scope] = new BehaviorSubject(pagination);
    }

    // get pagination observable by scope
    getScopePagination(scope: string): Observable<GridData<SupportIssue>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopeIssue(scope: string, object: SupportIssue): void {
        if (this.issueScoped[scope]) {
            this.issueScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.issueScoped[scope] = new BehaviorSubject(object);
    }

    getScopeIssue(scope: string): Observable<SupportIssue> {
        if (!this.issueScoped[scope])
            this.issueScoped[scope] = new BehaviorSubject(null);
        return this.issueScoped[scope].asObservable();
    }

    setScopeIssues(scope: string, objects: SupportIssue[]): void {
        if (this.issuesScoped[scope]) {
            this.issuesScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.issuesScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeIssues(scope: string): Observable<SupportIssue[]> {
        if (!this.issuesScoped[scope])
            this.issuesScoped[scope] = new BehaviorSubject(null);
        return this.issuesScoped[scope].asObservable();
    }

    pagination({
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
    } = {}): Observable<GridData<SupportIssue>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<SupportIssue> }>({
                query: graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data.pagination),
                tap((pagination) =>
                    scope
                        ? this.setScopePagination(scope, pagination)
                        : this.paginationSubject$.next(pagination),
                ),
            );
    }

    findById({
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
    } = {}): Observable<{
        object: SupportIssue;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: SupportIssue;
            }>({
                query: parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) =>
                    scope
                        ? this.setScopeIssue(scope, data.object)
                        : this.issueSubject$.next(data.object),
                ),
            );
    }

    find({
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
    } = {}): Observable<{
        object: SupportIssue;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: SupportIssue;
            }>({
                query: parseGqlFields(
                    graphqlStatement,
                    fields,
                    query,
                    constraint,
                ),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) =>
                    scope
                        ? this.setScopeIssue(scope, data.object)
                        : this.issueSubject$.next(data.object),
                ),
            );
    }

    get({
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
    } = {}): Observable<{
        objects: SupportIssue[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: SupportIssue[];
            }>({
                query: parseGqlFields(
                    graphqlStatement,
                    fields,
                    query,
                    constraint,
                ),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) =>
                    scope
                        ? this.setScopeIssues(scope, data.objects)
                        : this.issuesSubject$.next(data.objects),
                ),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {
            'Apollo-Require-Preflight': 'true',
        },
    }: {
        graphqlStatement?: DocumentNode;
        object?: SupportCreateIssue;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            variables: {
                payload: object,
            },
            context: {
                headers,
            },
        });
    }

    insert<T>({
        graphqlStatement = insertMutation,
        objects = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        objects?: SupportCreateIssue[];
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            variables: {
                payload: objects,
            },
            context: {
                headers,
            },
        });
    }

    updateById<T>({
        graphqlStatement = updateByIdMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: SupportUpdateIssueById;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            variables: {
                payload: object,
            },
            context: {
                headers,
            },
        });
    }

    update<T>({
        graphqlStatement = updateMutation,
        object = null,
        query = {},
        constraint = {},
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: SupportUpdateIssues;
        query?: QueryStatement;
        constraint?: QueryStatement;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
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

    deleteById<T>({
        graphqlStatement = deleteByIdMutation,
        id = null,
        constraint = {},
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        id?: string;
        constraint?: QueryStatement;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            variables: {
                id,
                constraint,
            },
            context: {
                headers,
            },
        });
    }

    delete<T>({
        graphqlStatement = deleteMutation,
        query = {},
        constraint = {},
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        query?: QueryStatement;
        constraint?: QueryStatement;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            variables: {
                query,
                constraint,
            },
            context: {
                headers,
            },
        });
    }

    // Mutation additionalApis
    createWebhookConfig<T>({
        graphqlStatement = createWebhookConfigMutation,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        headers?: GraphQLHeaders;
    } = {}): Observable<ToolsWebhook> {
        return this.graphqlService
            .client()
            .mutate<{ supportCreateWebhookConfig: ToolsWebhook }>({
                mutation: graphqlStatement,
                variables: {},
                context: {
                    headers,
                },
            })
            .pipe(
                first(),
                map((result) => result.data.supportCreateWebhookConfig),
            );
    }

    deleteWebhookConfig<T>({
        graphqlStatement = deleteWebhookConfigMutation,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            variables: {},
            context: {
                headers,
            },
        });
    }
}
