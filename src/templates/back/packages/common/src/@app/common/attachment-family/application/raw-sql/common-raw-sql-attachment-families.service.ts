import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { CommonIAttachmentFamilyRepository } from '../../domain/common-attachment-family.repository';
import { CommonAttachmentFamily } from '../../domain/common-attachment-family.aggregate';

@Injectable()
export class CommonRawSQLAttachmentFamiliesService
{
    constructor(
        private readonly repository: CommonIAttachmentFamilyRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<CommonAttachmentFamily[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
