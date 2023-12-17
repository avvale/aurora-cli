import { CoreFile, CoreFileUploaded } from '@api/graphql';
import { uploadFiles } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUploadAttachmentsHandler
{
    async main(
        files: CoreFileUploaded[],
    ): Promise<CoreFile[]>
    {
        return await uploadFiles(files);
    }
}