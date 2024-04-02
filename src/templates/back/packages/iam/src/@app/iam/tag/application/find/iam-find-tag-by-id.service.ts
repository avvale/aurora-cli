import { IamITagRepository, IamTag } from '@app/iam/tag';
import { IamTagId } from '@app/iam/tag/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindTagByIdService
{
    constructor(
        private readonly repository: IamITagRepository,
    ) {}

    async main(
        id: IamTagId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamTag>
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
