import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { FileUploaded, GraphQLHeaders, GraphQLService } from '@aurora';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FileUploaderService
{
    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    uploadFile<T>(
        {
            graphqlStatement = null,
            file = null,
            headers = {
                'Apollo-Require-Preflight': 'true',
            },
        }: {
            graphqlStatement?: DocumentNode;
            file?: FileUploaded;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    file,
                },
                context: {
                    headers,
                },
            });
    }

    uploadFiles<T>(
        {
            graphqlStatement = null,
            files = [],
            headers = {
                'Apollo-Require-Preflight': 'true',
            },
        }: {
            graphqlStatement?: DocumentNode;
            files?: FileUploaded[];
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    files,
                },
                context: {
                    headers,
                },
            });
    }
}