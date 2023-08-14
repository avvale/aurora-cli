import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IamIBoundedContextRepository } from '../../domain/iam-bounded-context.repository';
import { IamBoundedContext } from '../../domain/iam-bounded-context.aggregate';

@Injectable()
export class IamPaginateBoundedContextsService
{
    constructor(
        private readonly repository: IamIBoundedContextRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<IamBoundedContext>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
