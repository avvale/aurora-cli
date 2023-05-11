import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IBoundedContextRepository } from '../../domain/bounded-context.repository';
import { IamBoundedContext } from '../../domain/bounded-context.aggregate';

@Injectable()
export class FindBoundedContextService
{
    constructor(
        private readonly repository: IBoundedContextRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamBoundedContext>
    {
        return await this.repository.find({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}