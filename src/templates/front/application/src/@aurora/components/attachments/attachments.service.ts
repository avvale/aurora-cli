import { Injectable } from '@angular/core';
// import { HttpService } from '@horus/services/http.service';
import { environment } from 'environments/environment';
import { Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AttachmentsService
{
    setCropImage(parameters): Observable<any>
    {
        if (environment.debug) console.log('DEBUG - Crop image with parameters: ', parameters);

        return from([]);
        /* return this
            ._http
            .graphQLClient()
            .mutate({
                mutation: gql`
                    mutation AdminCropAttachment ($payload:JSON!) {
                        adminCropAttachment (payload:$payload)
                    }`,
                variables: {
                    payload: parameters // add object to arguments
                }
            }); */
    }

    deleteAttachment(attachment): Observable<any>
    {
        if (environment.debug) console.log('DEBUG - Trigger delete attachment: ', attachment);

        return from([]);
        /* return this
            ._http
            .graphQLClient()
            .mutate({
                mutation: gql`
                    mutation AdminDeleteAttachment ($attachment:AdminAttachmentInput!) {
                        adminDeleteAttachment (attachment:$attachment)
                    }`,
                variables: {
                    attachment: attachment
                }
            }); */
    }
}
