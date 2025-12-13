import { IamBoundedContext } from '@api/graphql';
import {
    IamDeleteBoundedContextByIdCommand,
    IamFindBoundedContextByIdQuery,
} from '@app/iam/bounded-context';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamDeleteBoundedContextByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamBoundedContext> {
        const boundedContext = await this.queryBus.ask(
            new IamFindBoundedContextByIdQuery(id, constraint, {
                timezone,
            }),
        );

        if (!boundedContext)
            throw new NotFoundException(
                `IamBoundedContext with id: ${id}, not found`,
            );

        await this.commandBus.dispatch(
            new IamDeleteBoundedContextByIdCommand(id, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return boundedContext;
    }
}
