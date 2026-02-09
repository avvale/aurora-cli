/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
  CommonCountry,
  CommonCreateCountry,
  CommonUpdateCountries,
  CommonUpdateCountryById,
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
} from '@apps/common/country';
import {
  GraphQLHeaders,
  GraphQLService,
  GridData,
  parseGqlFields,
  QueryStatement,
} from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { administrativeAreasCountryQuery } from './country.graphql';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  paginationSubject$: BehaviorSubject<GridData<CommonCountry> | null> =
    new BehaviorSubject(null);
  countrySubject$: BehaviorSubject<CommonCountry | null> = new BehaviorSubject(
    null,
  );
  countriesSubject$: BehaviorSubject<CommonCountry[] | null> =
    new BehaviorSubject(null);

  // scoped subjects
  paginationScoped: {
    [key: string]: BehaviorSubject<GridData<CommonCountry> | null>;
  } = {};
  countryScoped: { [key: string]: BehaviorSubject<CommonCountry | null> } = {};
  countriesScoped: { [key: string]: BehaviorSubject<CommonCountry[] | null> } =
    {};

  constructor(private readonly graphqlService: GraphQLService) {}

  /**
   * Getters
   */
  get pagination$(): Observable<GridData<CommonCountry>> {
    return this.paginationSubject$.asObservable();
  }

  get country$(): Observable<CommonCountry> {
    return this.countrySubject$.asObservable();
  }

  get countries$(): Observable<CommonCountry[]> {
    return this.countriesSubject$.asObservable();
  }

  // allows to store different types of pagination under different scopes this allows us
  // to have multiple observables with different streams of pagination data.
  setScopePagination(scope: string, pagination: GridData<CommonCountry>): void {
    if (this.paginationScoped[scope]) {
      this.paginationScoped[scope].next(pagination);
      return;
    }
    // create new subject if not exist
    this.paginationScoped[scope] = new BehaviorSubject(pagination);
  }

  // get pagination observable by scope
  getScopePagination(scope: string): Observable<GridData<CommonCountry>> {
    if (!this.paginationScoped[scope])
      this.paginationScoped[scope] = new BehaviorSubject(null);
    return this.paginationScoped[scope].asObservable();
  }

  setScopeCountry(scope: string, object: CommonCountry): void {
    if (this.countryScoped[scope]) {
      this.countryScoped[scope].next(object);
      return;
    }
    // create new subject if not exist
    this.countryScoped[scope] = new BehaviorSubject(object);
  }

  getScopeCountry(scope: string): Observable<CommonCountry> {
    if (!this.countryScoped[scope])
      this.countryScoped[scope] = new BehaviorSubject(null);
    return this.countryScoped[scope].asObservable();
  }

  setScopeCountries(scope: string, objects: CommonCountry[]): void {
    if (this.countriesScoped[scope]) {
      this.countriesScoped[scope].next(objects);
      return;
    }
    // create new subject if not exist
    this.countriesScoped[scope] = new BehaviorSubject(objects);
  }

  getScopeCountries(scope: string): Observable<CommonCountry[]> {
    if (!this.countriesScoped[scope])
      this.countriesScoped[scope] = new BehaviorSubject(null);
    return this.countriesScoped[scope].asObservable();
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
  } = {}): Observable<GridData<CommonCountry>> {
    // get result, map ang throw data across observable
    return this.graphqlService
      .client()
      .watchQuery<{ pagination: GridData<CommonCountry> }>({
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
    object: CommonCountry;
  }> {
    return this.graphqlService
      .client()
      .watchQuery<{
        object: CommonCountry;
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
            ? this.setScopeCountry(scope, data.object)
            : this.countrySubject$.next(data.object),
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
    object: CommonCountry;
  }> {
    return this.graphqlService
      .client()
      .watchQuery<{
        object: CommonCountry;
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
            ? this.setScopeCountry(scope, data.object)
            : this.countrySubject$.next(data.object),
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
    objects: CommonCountry[];
  }> {
    return this.graphqlService
      .client()
      .watchQuery<{
        objects: CommonCountry[];
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
            ? this.setScopeCountries(scope, data.objects)
            : this.countriesSubject$.next(data.objects),
        ),
      );
  }

  create<T>({
    graphqlStatement = createMutation,
    object = null,
    headers = {},
  }: {
    graphqlStatement?: DocumentNode;
    object?: CommonCreateCountry;
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
    objects?: CommonCreateCountry[];
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
    object?: CommonUpdateCountryById;
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
    object?: CommonUpdateCountries;
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

  // Queries additionalApis
  administrativeAreasCountry({
    graphqlStatement = administrativeAreasCountryQuery,
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
    objects: CommonCountry[];
  }> {
    return this.graphqlService
      .client()
      .watchQuery<{
        objects: CommonCountry[];
      }>({
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
        map((result) => result.data),
        tap((data) =>
          scope
            ? this.setScopeCountries(scope, data.objects)
            : this.countriesSubject$.next(data.objects),
        ),
      );
  }
}
