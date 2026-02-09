/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
  CommonCreateLang,
  CommonLang,
  CommonUpdateLangById,
  CommonUpdateLangs,
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
} from '@apps/common/lang';
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
export class LangService {
  paginationSubject$: BehaviorSubject<GridData<CommonLang> | null> =
    new BehaviorSubject(null);
  langSubject$: BehaviorSubject<CommonLang | null> = new BehaviorSubject(null);
  langsSubject$: BehaviorSubject<CommonLang[] | null> = new BehaviorSubject(
    null,
  );

  // scoped subjects
  paginationScoped: {
    [key: string]: BehaviorSubject<GridData<CommonLang> | null>;
  } = {};
  langScoped: { [key: string]: BehaviorSubject<CommonLang | null> } = {};
  langsScoped: { [key: string]: BehaviorSubject<CommonLang[] | null> } = {};

  constructor(private readonly graphqlService: GraphQLService) {}

  /**
   * Getters
   */
  get pagination$(): Observable<GridData<CommonLang>> {
    return this.paginationSubject$.asObservable();
  }

  get lang$(): Observable<CommonLang> {
    return this.langSubject$.asObservable();
  }

  get langs$(): Observable<CommonLang[]> {
    return this.langsSubject$.asObservable();
  }

  // allows to store different types of pagination under different scopes this allows us
  // to have multiple observables with different streams of pagination data.
  setScopePagination(scope: string, pagination: GridData<CommonLang>): void {
    if (this.paginationScoped[scope]) {
      this.paginationScoped[scope].next(pagination);
      return;
    }
    // create new subject if not exist
    this.paginationScoped[scope] = new BehaviorSubject(pagination);
  }

  // get pagination observable by scope
  getScopePagination(scope: string): Observable<GridData<CommonLang>> {
    if (!this.paginationScoped[scope])
      this.paginationScoped[scope] = new BehaviorSubject(null);
    return this.paginationScoped[scope].asObservable();
  }

  setScopeLang(scope: string, object: CommonLang): void {
    if (this.langScoped[scope]) {
      this.langScoped[scope].next(object);
      return;
    }
    // create new subject if not exist
    this.langScoped[scope] = new BehaviorSubject(object);
  }

  getScopeLang(scope: string): Observable<CommonLang> {
    if (!this.langScoped[scope])
      this.langScoped[scope] = new BehaviorSubject(null);
    return this.langScoped[scope].asObservable();
  }

  setScopeLangs(scope: string, objects: CommonLang[]): void {
    if (this.langsScoped[scope]) {
      this.langsScoped[scope].next(objects);
      return;
    }
    // create new subject if not exist
    this.langsScoped[scope] = new BehaviorSubject(objects);
  }

  getScopeLangs(scope: string): Observable<CommonLang[]> {
    if (!this.langsScoped[scope])
      this.langsScoped[scope] = new BehaviorSubject(null);
    return this.langsScoped[scope].asObservable();
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
  } = {}): Observable<GridData<CommonLang>> {
    // get result, map ang throw data across observable
    return this.graphqlService
      .client()
      .watchQuery<{ pagination: GridData<CommonLang> }>({
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
    object: CommonLang;
  }> {
    return this.graphqlService
      .client()
      .watchQuery<{
        object: CommonLang;
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
            ? this.setScopeLang(scope, data.object)
            : this.langSubject$.next(data.object),
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
    object: CommonLang;
  }> {
    return this.graphqlService
      .client()
      .watchQuery<{
        object: CommonLang;
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
            ? this.setScopeLang(scope, data.object)
            : this.langSubject$.next(data.object),
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
    objects: CommonLang[];
  }> {
    return this.graphqlService
      .client()
      .watchQuery<{
        objects: CommonLang[];
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
            ? this.setScopeLangs(scope, data.objects)
            : this.langsSubject$.next(data.objects),
        ),
      );
  }

  create<T>({
    graphqlStatement = createMutation,
    object = null,
    headers = {},
  }: {
    graphqlStatement?: DocumentNode;
    object?: CommonCreateLang;
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
    objects?: CommonCreateLang[];
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
    object?: CommonUpdateLangById;
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
    object?: CommonUpdateLangs;
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
