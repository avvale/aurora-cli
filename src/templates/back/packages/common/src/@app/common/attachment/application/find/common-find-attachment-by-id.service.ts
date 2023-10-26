import { CommonAttachment, CommonIAttachmentRepository } from '@app/common/attachment';
import { CommonAttachmentId } from '@app/common/attachment/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindAttachmentByIdService
{
    constructor(
        private readonly repository: CommonIAttachmentRepository,
    ) {}

    async main(
        id: CommonAttachmentId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<CommonAttachment>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}
