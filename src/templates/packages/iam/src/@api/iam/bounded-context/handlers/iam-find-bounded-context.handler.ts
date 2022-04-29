import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindBoundedContextQuery } from '../../../../@apps/iam/bounded-context/application/find/find-bounded-context.query';
import { IamBoundedContext } from '../../../../graphql';
import { IamBoundedContextDto } from '../dto';

@Injectable()
export class IamFindBoundedContextHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamBoundedContext | IamBoundedContextDto>
    {
        return await this.queryBus.ask(new FindBoundedContextQuery(queryStatement, constraint, { timezone }));
    }
}