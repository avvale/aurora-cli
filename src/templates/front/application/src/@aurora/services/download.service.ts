import { Injectable } from '@angular/core';
import { GraphQLService, base64ToBlob, log } from '@aurora';
import { saveAs } from 'file-saver';
import gql from 'graphql-tag';

@Injectable({
    providedIn: 'root',
})
export class DownloadService
{
    constructor(
        private readonly graphqlService: GraphQLService,
    )
    {}

    public download(
        {
            filename,
            relativePathSegments,
            containerName,
            originFilename,
        }: {
            filename: string;
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
                    query StorageAccountGetBase64FileFileManager (
                        $file: StorageAccountFileManagerFileInput!
                    )
                    {
                        storageAccountGetBase64FileFileManager(
                            file: $file
                        )
                        {
                            base64
                        }
                    },
                `,
                variables: {
                    file: {
                        filename,
                        relativePathSegments,
                        containerName,
                    },
                },
            })
            .valueChanges
            .subscribe(({ data }) =>
            {
                log('[DEBUG] - Download attachment: ', data);

                if (data['storageAccountGetBase64FileFileManager'])
                {
                    saveAs(
                        base64ToBlob(data['storageAccountGetBase64FileFileManager']['base64']),
                        originFilename || filename,
                    );
                }
            });
    }
}
