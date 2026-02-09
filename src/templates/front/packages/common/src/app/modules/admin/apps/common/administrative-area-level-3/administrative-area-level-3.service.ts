/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
  CommonAdministrativeAreaLevel3,
  CommonCreateAdministrativeAreaLevel3,
  CommonUpdateAdministrativeAreaLevel3ById,
  CommonUpdateAdministrativeAreasLevel3,
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
} from '@apps/common/administrative-area-level-3';
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
export class AdministrativeAreaLevel3Service {
  paginationSubject$: BehaviorSubject<GridData<CommonAdministrativeAreaLevel3> | null> =
    new BehaviorSubject(null);
  administrativeAreaLevel3Subject$: BehaviorSubject<CommonAdministrativeAreaLevel3 | null> =
    new BehaviorSubject(null);
  administrativeAreasLevel3Subject$: BehaviorSubject<
    CommonAdministrativeAreaLevel3[] | null
  > = new BehaviorSubject(null);

  // scoped subjects
  paginationScoped: {
    [
      key: string
    ]: BehaviorSubject<GridData<CommonAdministrativeAreaLevel3> | null>;
  } = {};
  administrativeAreaLevel3Scoped: {
    [key: string]: BehaviorSubject<CommonAdministrativeAreaLevel3 | null>;
  } = {};
  administrativeAreasLevel3Scoped: {
    [key: string]: BehaviorSubject<CommonAdministrativeAreaLevel3[] | null>;
  } = {};

  constructor(private readonly graphqlService: GraphQLService) {}

  /**
   * Getters
   */
  get pagination$(): Observable<GridData<CommonAdministrativeAreaLevel3>> {
    return this.paginationSubject$.asObservable();
  }

  get administrativeAreaLevel3$(): Observable<CommonAdministrativeAreaLevel3> {
    return this.administrativeAreaLevel3Subject$.asObservable();
  }

  get administrativeAreasLevel3$(): Observable<
    CommonAdministrativeAreaLevel3[]
  > {
    return this.administrativeAreasLevel3Subject$.asObservable();
  }

  // allows to store different types of pagination under different scopes this allows us
  // to have multiple observables with different streams of pagination data.
  setScopePagination(
    scope: string,
    pagination: GridData<CommonAdministrativeAreaLevel3>,
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
  ): Observable<GridData<CommonAdministrativeAreaLevel3>> {
    if (!this.paginationScoped[scope])
      this.paginationScoped[scope] = new BehaviorSubject(null);
    return this.paginationScoped[scope].asObservable();
  }

  setScopeAdministrativeAreaLevel3(
    scope: string,
    object: CommonAdministrativeAreaLevel3,
  ): void {
    if (this.administrativeAreaLevel3Scoped[scope]) {
      this.administrativeAreaLevel3Scoped[scope].next(object);
      return;
    }
    // create new subject if not exist
    this.administrativeAreaLevel3Scoped[scope] = new BehaviorSubject(object);
  }

  getScopeAdministrativeAreaLevel3(
    scope: string,
  ): Observable<CommonAdministrativeAreaLevel3> {
    if (!this.administrativeAreaLevel3Scoped[scope])
      this.administrativeAreaLevel3Scoped[scope] = new BehaviorSubject(null);
    return this.administrativeAreaLevel3Scoped[scope].asObservable();
  }

  setScopeAdministrativeAreasLevel3(
    scope: string,
    objects: CommonAdministrativeAreaLevel3[],
  ): void {
    if (this.administrativeAreasLevel3Scoped[scope]) {
      this.administrativeAreasLevel3Scoped[scope].next(objects);
      return;
    }
    // create new subject if not exist
    this.administrativeAreasLevel3Scoped[scope] = new BehaviorSubject(objects);
  }

  getScopeAdministrativeAreasLevel3(
    scope: string,
  ): Observable<CommonAdministrativeAreaLevel3[]> {
    if (!this.administrativeAreasLevel3Scoped[scope])
      this.administrativeAreasLevel3Scoped[scope] = new BehaviorSubject(null);
    return this.administrativeAreasLevel3Scoped[scope].asObservable();
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
  } = {}): Observable<GridData<CommonAdministrativeAreaLevel3>> {
    // get result, map ang throw data across observable
    return this.graphqlService
      .client()
      .watchQuery<{ pagination: GridData<CommonAdministrativeAreaLevel3> }>({
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
    object: CommonAdministrativeAreaLevel3;
  }> {
    return this.graphqlService
      .client()
      .watchQuery<{
        object: CommonAdministrativeAreaLevel3;
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
            ? this.setScopeAdministrativeAreaLevel3(scope, data.object)
            : this.administrativeAreaLevel3Subject$.next(data.object),
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
    object: CommonAdministrativeAreaLevel3;
  }> {
    return this.graphqlService
      .client()
      .watchQuery<{
        object: CommonAdministrativeAreaLevel3;
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
            ? this.setScopeAdministrativeAreaLevel3(scope, data.object)
            : this.administrativeAreaLevel3Subject$.next(data.object),
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
    objects: CommonAdministrativeAreaLevel3[];
  }> {
    return this.graphqlService
      .client()
      .watchQuery<{
        objects: CommonAdministrativeAreaLevel3[];
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
            ? this.setScopeAdministrativeAreasLevel3(scope, data.objects)
            : this.administrativeAreasLevel3Subject$.next(data.objects),
        ),
      );
  }

  create<T>({
    graphqlStatement = createMutation,
    object = null,
    headers = {},
  }: {
    graphqlStatement?: DocumentNode;
    object?: CommonCreateAdministrativeAreaLevel3;
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
    objects?: CommonCreateAdministrativeAreaLevel3[];
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
    object?: CommonUpdateAdministrativeAreaLevel3ById;
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
    object?: CommonUpdateAdministrativeAreasLevel3;
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
