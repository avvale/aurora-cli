import { Injectable } from '@angular/core';
import { GraphQLHeaders, GraphQLService } from '@aurora';
import { BehaviorSubject, Observable, first, map, tap } from 'rxjs';
import { getRelations } from './settings.graphql';
import { CommonLang } from '@apps/common';

@Injectable({
    providedIn: 'root',
})
export class SettingsService
{

    langsSubject$: BehaviorSubject<CommonLang[] | null> = new BehaviorSubject(null);

    get langs$(): Observable<CommonLang[]>
    {
        return this.langsSubject$.asObservable();
    }

    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    getRelations(
        {
            headers = {},
        }: {
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        commonLangs: CommonLang[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                commonLangs: CommonLang[];
            }>({
                query    : getRelations,
                variables: {},
                context  : {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.langsSubject$.next(data.commonLangs);
                }),
            );
    }
}
