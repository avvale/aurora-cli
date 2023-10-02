import { Injectable } from '@angular/core';
import { DocumentNode } from '@apollo/client/core';
import { GraphQLHeaders, GraphQLService } from '@aurora';
import { Observable, first, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SlugService
{
    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    checkSlug(
        {
            graphqlStatement = null,
            slug = '',
            id = '',
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            slug?: string;
            id?: string;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        slug: string;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                slug: string;
            }>({
                query    : graphqlStatement,
                variables: {
                    slug,
                    id,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
            );
    }
}