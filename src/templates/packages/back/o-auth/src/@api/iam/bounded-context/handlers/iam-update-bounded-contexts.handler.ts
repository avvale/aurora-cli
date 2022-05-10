import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetBoundedContextsQuery } from '@apps/iam/bounded-context/application/get/get-bounded-contexts.query';
import { UpdateBoundedContextsCommand } from '@apps/iam/bounded-context/application/update/update-bounded-contexts.command';
import { IamBoundedContext, IamUpdateBoundedContextsInput } from '../../../../graphql';
import { IamBoundedContextDto, IamUpdateBoundedContextsDto } from '../dto';

@Injectable()
export class IamUpdateBoundedContextsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateBoundedContextsInput | IamUpdateBoundedContextsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamBoundedContext | IamBoundedContextDto>
    {
        await this.commandBus.dispatch(new UpdateBoundedContextsCommand(payload, queryStatement, constraint, { timezone }));

        return await this.queryBus.ask(new GetBoundedContextsQuery(queryStatement, constraint, { timezone }));
    }
}