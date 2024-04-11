import { Injectable } from '@angular/core';
import { Attachment, GraphQLService, base64ToBlob, commonCreateBlobAttachmentMutation, log } from '@aurora';
import { saveAs } from 'file-saver';

@Injectable({
    providedIn: 'root',
})
export class AttachmentsDownloadService
{
    constructor(
        private readonly graphqlService: GraphQLService,
    )
    {}

    public download(attachment: Attachment): void
    {
        this
            .graphqlService
            .client()
            .mutate<string>({
                mutation : commonCreateBlobAttachmentMutation,
                variables: {
                    payload: attachment,
                },
            })
            .subscribe(({ data }) =>
            {
                log('[DEBUG] - Download attachment: ', data);

                saveAs(
                    base64ToBlob(data['commonCreateBlobAttachment']),
                    attachment.filename,
                );
            });
    }
}
