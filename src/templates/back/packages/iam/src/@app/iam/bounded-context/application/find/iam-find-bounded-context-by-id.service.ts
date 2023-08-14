import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { IamIBoundedContextRepository } from '../../domain/iam-bounded-context.repository';
import { IamBoundedContext } from '../../domain/iam-bounded-context.aggregate';
import { IamBoundedContextId } from '../../domain/value-objects';

@Injectable()
export class IamFindBoundedContextByIdService
{
    constructor(
        private readonly repository: IamIBoundedContextRepository,
    ) {}

    async main(
        id: IamBoundedContextId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamBoundedContext>
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
