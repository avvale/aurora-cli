import { CommonAttachmentDto } from '../dto';
import { CommonAttachmentInput } from '@api/graphql';
import { CoreGetBase64FromFileService } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateBlobAttachmentHandler
{
    constructor(
        private readonly coreGetBase64FromFileService: CoreGetBase64FromFileService,
    ) {}

    async main(
        payload: CommonAttachmentInput | CommonAttachmentDto,
    ): Promise<string>
    {
        return this.coreGetBase64FromFileService.main(
            payload.relativePathSegments,
            payload.filename,
        );
    }
}