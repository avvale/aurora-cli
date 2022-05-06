import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetBoundedContextsQuery } from '../../../../@apps/iam/bounded-context/application/get/get-bounded-contexts.query';
import { IamBoundedContext } from '../../../../graphql';
import { IamBoundedContextDto } from '../dto';

@Injectable()
export class IamGetBoundedContextsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamBoundedContext[] | IamBoundedContextDto[]>
    {
        return await this.queryBus.ask(new GetBoundedContextsQuery(queryStatement, constraint, { timezone }));
    }
}