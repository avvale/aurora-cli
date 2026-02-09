/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
  CommonAdministrativeAreaLevel1,
  CommonCreateAdministrativeAreaLevel1,
  CommonUpdateAdministrativeAreaLevel1ById,
  CommonUpdateAdministrativeAreasLevel1,
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
} from '@apps/common/administrative-area-level-1';
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
export class AdministrativeAreaLevel1Service {
  paginationSubject$: BehaviorSubject<GridData<CommonAdministrativeAreaLevel1> | null> =
    new BehaviorSubject(null);
  administrativeAreaLevel1Subject$: BehaviorSubject<CommonAdministrativeAreaLevel1 | null> =
    new BehaviorSubject(null);
  administrativeAreasLevel1Subject$: BehaviorSubject<
    CommonAdministrativeAreaLevel1[] | null
  > = new BehaviorSubject(null);

  // scoped subjects
  paginationScoped: {
    [
      key: string
    ]: BehaviorSubject<GridData<CommonAdministrativeAreaLevel1> | null>;
  } = {};
  administrativeAreaLevel1Scoped: {
    [key: string]: BehaviorSubject<CommonAdministrativeAreaLevel1 | null>;
  } = {};
  administrativeAreasLevel1Scoped: {
    [key: string]: BehaviorSubject<CommonAdministrativeAreaLevel1[] | null>;
  } = {};

  constructor(private readonly graphqlService: GraphQLService) {}

  /**
   * Getters
   */
  get pagination$(): Observable<GridData<CommonAdministrativeAreaLevel1>> {
    return this.paginationSubject$.asObservable();
  }

  get administrativeAreaLevel1$(): Observable<CommonAdministrativeAreaLevel1> {
    return this.administrativeAreaLevel1Subject$.asObservable();
  }

  get administrativeAreasLevel1$(): Observable<
    CommonAdministrativeAreaLevel1[]
  > {
    return this.administrativeAreasLevel1Subject$.asObservable();
  }

  // allows to store different types of pagination under different scopes this allows us
  // to have multiple observables with different streams of pagination data.
  setScopePagination(
    scope: string,
    pagination: GridData<CommonAdministrativeAreaLevel1>,
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
  ): Observable<GridData<CommonAdministrativeAreaLevel1>> {
    if (!this.paginationScoped[scope])
      this.paginationScoped[scope] = new BehaviorSubject(null);
    return this.paginationScoped[scope].asObservable();
  }

  setScopeAdministrativeAreaLevel1(
    scope: string,
    object: CommonAdministrativeAreaLevel1,
  ): void {
    if (this.administrativeAreaLevel1Scoped[scope]) {
      this.administrativeAreaLevel1Scoped[scope].next(object);
      return;
    }
    // create new subject if not exist
    this.administrativeAreaLevel1Scoped[scope] = new BehaviorSubject(object);
  }

  getScopeAdministrativeAreaLevel1(
    scope: string,
  ): Observable<CommonAdministrativeAreaLevel1> {
    if (!this.administrativeAreaLevel1Scoped[scope])
      this.administrativeAreaLevel1Scoped[scope] = new BehaviorSubject(null);
    return this.administrativeAreaLevel1Scoped[scope].asObservable();
  }

  setScopeAdministrativeAreasLevel1(
    scope: string,
    objects: CommonAdministrativeAreaLevel1[],
  ): void {
    if (this.administrativeAreasLevel1Scoped[scope]) {
      this.administrativeAreasLevel1Scoped[scope].next(objects);
      return;
    }
    // create new subject if not exist
    this.administrativeAreasLevel1Scoped[scope] = new BehaviorSubject(objects);
  }

  getScopeAdministrativeAreasLevel1(
    scope: string,
  ): Observable<CommonAdministrativeAreaLevel1[]> {
    if (!this.administrativeAreasLevel1Scoped[scope])
      this.administrativeAreasLevel1Scoped[scope] = new BehaviorSubject(null);
    return this.administrativeAreasLevel1Scoped[scope].asObservable();
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
  } = {}): Observable<GridData<CommonAdministrativeAreaLevel1>> {
    // get result, map ang throw data across observable
    return this.graphqlService
      .client()
      .watchQuery<{ pagination: GridData<CommonAdministrativeAreaLevel1> }>({
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
    object: CommonAdministrativeAreaLevel1;
  }> {
    return this.graphqlService
      .client()
      .watchQuery<{
        object: CommonAdministrativeAreaLevel1;
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
            ? this.setScopeAdministrativeAreaLevel1(scope, data.object)
            : this.administrativeAreaLevel1Subject$.next(data.object),
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
    object: CommonAdministrativeAreaLevel1;
  }> {
    return this.graphqlService
      .client()
      .watchQuery<{
        object: CommonAdministrativeAreaLevel1;
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
            ? this.setScopeAdministrativeAreaLevel1(scope, data.object)
            : this.administrativeAreaLevel1Subject$.next(data.object),
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
    objects: CommonAdministrativeAreaLevel1[];
  }> {
    return this.graphqlService
      .client()
      .watchQuery<{
        objects: CommonAdministrativeAreaLevel1[];
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
            ? this.setScopeAdministrativeAreasLevel1(scope, data.objects)
            : this.administrativeAreasLevel1Subject$.next(data.objects),
        ),
      );
  }

  create<T>({
    graphqlStatement = createMutation,
    object = null,
    headers = {},
  }: {
    graphqlStatement?: DocumentNode;
    object?: CommonCreateAdministrativeAreaLevel1;
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
    objects?: CommonCreateAdministrativeAreaLevel1[];
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
    object?: CommonUpdateAdministrativeAreaLevel1ById;
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
    object?: CommonUpdateAdministrativeAreasLevel1;
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
