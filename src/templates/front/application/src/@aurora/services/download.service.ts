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
            relativePathSegments,
            filename,
            originFilename,
        }: {
            relativePathSegments: string[];
            filename: string;
            originFilename?: string;
        },
    ): void
    {
        this
            .graphqlService
            .client()
            .watchQuery<string>({
                query: gql`
                    query CoreGetBase64FromFile (
                        $relativePathSegments: [GraphQLString!]!
                        $filename: GraphQLString!
                    )
                    {
                        coreGetBase64FromFile(
                            relativePathSegments: $relativePathSegments
                            filename: $filename
                        )
                    },
                `,
                variables: {
                    relativePathSegments,
                    filename,
                },
            })
            .valueChanges
            .subscribe(({ data }) =>
            {
                log('[DEBUG] - Download attachment: ', data);

                if (data['coreGetBase64FromFile'])
                {
                    saveAs(
                        base64ToBlob(data['coreGetBase64FromFile']),
                        originFilename || filename,
                    );
                }
            });
    }
}
