import { CoreFile, CoreFileUploaded } from '@api/graphql';
import { CoreFileUploaderService } from '@aurora/modules/file-uploader';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUploadAttachmentsHandler
{
    constructor(
        private readonly coreFileUploaderService: CoreFileUploaderService,
    ) {}

    async main(
        files: CoreFileUploaded[],
    ): Promise<CoreFile[]>
    {
        return await this.coreFileUploaderService.uploadFiles(files);
    }
}