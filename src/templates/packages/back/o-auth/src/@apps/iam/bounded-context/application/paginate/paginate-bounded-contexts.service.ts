import { Injectable } from '@nestjs/common';
import { QueryStatement } from 'aurora-ts-core';
import { Pagination } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { IBoundedContextRepository } from '../../domain/bounded-context.repository';
import { IamBoundedContext } from '../../domain/bounded-context.aggregate';

@Injectable()
export class PaginateBoundedContextsService
{
    constructor(
        private readonly repository: IBoundedContextRepository,
    ) {}

    async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<IamBoundedContext>>
    {
        return await this.repository.paginate({ queryStatement, constraint, cQMetadata });
    }
}