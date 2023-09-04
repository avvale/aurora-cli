import { CommonAttachmentFamily, CommonIAttachmentFamilyRepository } from '@app/common/attachment-family';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonGetAttachmentFamiliesService
{
    constructor(
        private readonly repository: CommonIAttachmentFamilyRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<CommonAttachmentFamily[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
