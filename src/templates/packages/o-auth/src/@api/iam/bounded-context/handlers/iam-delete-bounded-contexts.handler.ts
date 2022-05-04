import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetBoundedContextsQuery } from '../../../../@apps/iam/bounded-context/application/get/get-bounded-contexts.query';
import { DeleteBoundedContextsCommand } from '../../../../@apps/iam/bounded-context/application/delete/delete-bounded-contexts.command';
import { IamBoundedContext } from '../../../../graphql';
import { IamBoundedContextDto } from '../dto';

@Injectable()
export class IamDeleteBoundedContextsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamBoundedContext[] | IamBoundedContextDto[]>
    {
        const boundedContexts = await this.queryBus.ask(new GetBoundedContextsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteBoundedContextsCommand(queryStatement, constraint, { timezone }));

        return boundedContexts;
    }
}