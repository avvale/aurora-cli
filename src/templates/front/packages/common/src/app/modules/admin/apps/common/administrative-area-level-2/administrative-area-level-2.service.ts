/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
  CommonAdministrativeAreaLevel2,
  CommonCreateAdministrativeAreaLevel2,
  CommonUpdateAdministrativeAreaLevel2ById,
  CommonUpdateAdministrativeAreasLevel2,
} from '@apps/common';
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
} from '@apps/common/administrative-area-level-2';
import {
  GraphQLHeaders,
  GraphQLService,
  GridData,
  parseGqlFields,
  QueryStatement,
} from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdministrativeAreaLevel2Service {
  paginationSubject$: BehaviorSubject<GridData<CommonAdministrativeAreaLevel2> | null> =
    new BehaviorSubject(null);
  administrativeAreaLevel2Subject$: BehaviorSubject<CommonAdministrativeAreaLevel2 | null> =
    new BehaviorSubject(null);
  administrativeAreasLevel2Subject$: BehaviorSubject<
    CommonAdministrativeAreaLevel2[] | null
  > = new BehaviorSubject(null);

  // scoped subjects
  paginationScoped: {
    [
      key: string
    ]: BehaviorSubject<GridData<CommonAdministrativeAreaLevel2> | null>;
  } = {};
  administrativeAreaLevel2Scoped: {
    [key: string]: BehaviorSubject<CommonAdministrativeAreaLevel2 | null>;
  } = {};
  administrativeAreasLevel2Scoped: {
    [key: string]: BehaviorSubject<CommonAdministrativeAreaLevel2[] | null>;
  } = {};

  constructor(private readonly graphqlService: GraphQLService) {}

  /**
   * Getters
   */
  get pagination$(): Observable<GridData<CommonAdministrativeAreaLevel2>> {
    return this.paginationSubject$.asObservable();
  }

  get administrativeAreaLevel2$(): Observable<CommonAdministrativeAreaLevel2> {
    return this.administrativeAreaLevel2Subject$.asObservable();
  }

  get administrativeAreasLevel2$(): Observable<
    CommonAdministrativeAreaLevel2[]
  > {
    return this.administrativeAreasLevel2Subject$.asObservable();
  }

  // allows to store different types of pagination under different scopes this allows us
  // to have multiple observables with different streams of pagination data.
  setScopePagination(
    scope: string,
    pagination: GridData<CommonAdministrativeAreaLevel2>,
  ): void {
    if (this.paginationScoped[scope]) {
      this.paginationScoped[scope].next(pagination);
      return;
    }
    // create new subject if not exist
    this.paginationScoped[scope] = new BehaviorSubject(pagination);
  }

  // get pagination observable by scope
  getScopePagination(
    scope: string,
  ): Observable<GridData<CommonAdministrativeAreaLevel2>> {
    if (!this.paginationScoped[scope])
      this.paginationScoped[scope] = new BehaviorSubject(null);
    return this.paginationScoped[scope].asObservable();
  }

  setScopeAdministrativeAreaLevel2(
    scope: string,
    object: CommonAdministrativeAreaLevel2,
  ): void {
    if (this.administrativeAreaLevel2Scoped[scope]) {
      this.administrativeAreaLevel2Scoped[scope].next(object);
      return;
    }
    // create new subject if not exist
    this.administrativeAreaLevel2Scoped[scope] = new BehaviorSubject(object);
  }

  getScopeAdministrativeAreaLevel2(
    scope: string,
  ): Observable<CommonAdministrativeAreaLevel2> {
    if (!this.administrativeAreaLevel2Scoped[scope])
      this.administrativeAreaLevel2Scoped[scope] = new BehaviorSubject(null);
    return this.administrativeAreaLevel2Scoped[scope].asObservable();
  }

  setScopeAdministrativeAreasLevel2(
    scope: string,
    objects: CommonAdministrativeAreaLevel2[],
  ): void {
    if (this.administrativeAreasLevel2Scoped[scope]) {
      this.administrativeAreasLevel2Scoped[scope].next(objects);
      return;
    }
    // create new subject if not exist
    this.administrativeAreasLevel2Scoped[scope] = new BehaviorSubject(objects);
  }

  getScopeAdministrativeAreasLevel2(
    scope: string,
  ): Observable<CommonAdministrativeAreaLevel2[]> {
    if (!this.administrativeAreasLevel2Scoped[scope])
      this.administrativeAreasLevel2Scoped[scope] = new BehaviorSubject(null);
    return this.administrativeAreasLevel2Scoped[scope].asObservable();
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
  } = {}): Observable<GridData<CommonAdministrativeAreaLevel2>> {
    // get result, map ang throw data across observable
    return this.graphqlService
      .client()
      .watchQuery<{ pagination: GridData<CommonAdministrativeAreaLevel2> }>({
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
    object: CommonAdministrativeAreaLevel2;
  }> {
    return this.graphqlService
      .client()
      .watchQuery<{
        object: CommonAdministrativeAreaLevel2;
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
            ? this.setScopeAdministrativeAreaLevel2(scope, data.object)
            : this.administrativeAreaLevel2Subject$.next(data.object),
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
    object: CommonAdministrativeAreaLevel2;
  }> {
    return this.graphqlService
      .client()
      .watchQuery<{
        object: CommonAdministrativeAreaLevel2;
      }>({
        query: parseGqlFields(graphqlStatement, fields, query, constraint),
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
            ? this.setScopeAdministrativeAreaLevel2(scope, data.object)
            : this.administrativeAreaLevel2Subject$.next(data.object),
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
    objects: CommonAdministrativeAreaLevel2[];
  }> {
    return this.graphqlService
      .client()
      .watchQuery<{
        objects: CommonAdministrativeAreaLevel2[];
      }>({
        query: parseGqlFields(graphqlStatement, fields, query, constraint),
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
            ? this.setScopeAdministrativeAreasLevel2(scope, data.objects)
            : this.administrativeAreasLevel2Subject$.next(data.objects),
        ),
      );
  }

  create<T>({
    graphqlStatement = createMutation,
    object = null,
    headers = {},
  }: {
    graphqlStatement?: DocumentNode;
    object?: CommonCreateAdministrativeAreaLevel2;
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
    objects?: CommonCreateAdministrativeAreaLevel2[];
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
    object?: CommonUpdateAdministrativeAreaLevel2ById;
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
    object?: CommonUpdateAdministrativeAreasLevel2;
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
}
