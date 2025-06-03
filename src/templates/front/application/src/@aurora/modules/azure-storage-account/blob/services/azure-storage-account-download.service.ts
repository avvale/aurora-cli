import { Injectable } from '@angular/core';
import { GraphQLService, base64ToBlob, log } from '@aurora';
import { saveAs } from 'file-saver';
import gql from 'graphql-tag';

@Injectable({
    providedIn: 'root',
})
export class AzureStorageAccountDownloadService
{
    constructor(
        private readonly graphqlService: GraphQLService,
    )
    {}

    public download(
        {
            blobName,
            relativePathSegments,
            containerName,
            originFilename,
        }: {
            blobName: string;
            relativePathSegments: string[];
            containerName?: string;
            originFilename?: string;
        },
    ): void
    {
        this
            .graphqlService
            .client()
            .watchQuery<string>({
                query: gql`
                    query AzureStorageAccountGetBase64FromBlob (
                        $blobName: GraphQLString!
                        $relativePathSegments: [GraphQLString!]!
                        $containerName: GraphQLString
                    )
                    {
                        azureStorageAccountGetBase64FromBlob (
                            blobName: $blobName
                            relativePathSegments: $relativePathSegments
                            containerName: $containerName
                        )
                    },
                `,
                variables: {
                    blobName,
                    relativePathSegments,
                    containerName,
                },
            })
            .valueChanges
            .subscribe(({ data }) =>
            {
                log('[DEBUG] - Download attachment: ', data);

                if (data['azureStorageAccountGetBase64FromBlob'])
                {
                    saveAs(
                        base64ToBlob(data['azureStorageAccountGetBase64FromBlob']['base64']),
                        originFilename || blobName,
                    );
                }
            });
    }
}
