import { Injectable } from '@angular/core';
import { Attachment, CropProperties, GraphQLService, log } from '@aurora';
import { Observable, map } from 'rxjs';
import { commonCreateCropMutation, commonDeleteAttachmentMutation } from './attachments.graphql';

@Injectable({
    providedIn: 'root',
})
export class AttachmentsService
{
    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    setCropImage(
        attachment,
        crop: CropProperties,
    ): Observable<any>
    {
        log('[DEBUG] - Crop image with parameters: ', {
            attachment,
            crop,
        });

        return this
            .graphqlService
            .client()
            .mutate<string>({
                mutation : commonCreateCropMutation,
                variables: {
                    attachment,
                    crop,
                },
            })
            .pipe(
                map(({ data }) => data['commonCreateCrop']),
            );
    }

    deleteAttachment(attachment: Attachment): Observable<any>
    {
        log('[DEBUG] - Delete attachment: ', attachment);

        return this
            .graphqlService
            .client()
            .mutate<string>({
                mutation : commonDeleteAttachmentMutation,
                variables: {
                    payload: attachment,
                },
            })
            .pipe(
                map(({ data }) => data['commonDeleteAttachment']),
            );
    }
}
