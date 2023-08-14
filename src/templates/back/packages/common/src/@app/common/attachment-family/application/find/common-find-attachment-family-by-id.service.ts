import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { CommonIAttachmentFamilyRepository } from '../../domain/common-attachment-family.repository';
import { CommonAttachmentFamily } from '../../domain/common-attachment-family.aggregate';
import { CommonAttachmentFamilyId } from '../../domain/value-objects';

@Injectable()
export class CommonFindAttachmentFamilyByIdService
{
    constructor(
        private readonly repository: CommonIAttachmentFamilyRepository,
    ) {}

    async main(
        id: CommonAttachmentFamilyId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<CommonAttachmentFamily>
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
