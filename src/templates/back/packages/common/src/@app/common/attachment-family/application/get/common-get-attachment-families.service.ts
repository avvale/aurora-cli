import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { CommonIAttachmentFamilyRepository } from '../../domain/common-attachment-family.repository';
import { CommonAttachmentFamily } from '../../domain/common-attachment-family.aggregate';

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
