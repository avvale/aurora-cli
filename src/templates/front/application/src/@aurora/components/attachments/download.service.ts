import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Attachment, GraphQLService, Utils, commonCreateBlobAttachmentMutation, log } from '@aurora';
import { saveAs } from 'file-saver';

@Injectable({
    providedIn: 'root',
})
export class DownloadService
{
    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly sanitizer: DomSanitizer,
    )
    {}

    public download(attachment: Attachment, callback: () => void = () => { /**/ }): void
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

                const blob = Utils.convertBase64ToBlob(data['commonCreateBlobAttachment']);

                saveAs(blob, attachment.filename);
            });
    }
}
