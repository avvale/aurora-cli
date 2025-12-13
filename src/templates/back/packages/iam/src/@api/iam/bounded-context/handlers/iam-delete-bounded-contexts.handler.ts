import { IamBoundedContext } from '@api/graphql';
import {
    IamDeleteBoundedContextsCommand,
    IamGetBoundedContextsQuery,
} from '@app/iam/bounded-context';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamDeleteBoundedContextsHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamBoundedContext[]> {
        const boundedContexts = await this.queryBus.ask(
            new IamGetBoundedContextsQuery(queryStatement, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new IamDeleteBoundedContextsCommand(queryStatement, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return boundedContexts;
    }
}
