import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetBoundedContextsQuery } from '@app/iam/bounded-context/application/get/get-bounded-contexts.query';
import { DeleteBoundedContextsCommand } from '@app/iam/bounded-context/application/delete/delete-bounded-contexts.command';
import { IamBoundedContext } from '@api/graphql';
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
        auditing?: AuditingMeta,
    ): Promise<IamBoundedContext[] | IamBoundedContextDto[]>
    {
        const boundedContexts = await this.queryBus.ask(new GetBoundedContextsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteBoundedContextsCommand(
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return boundedContexts;
    }
}