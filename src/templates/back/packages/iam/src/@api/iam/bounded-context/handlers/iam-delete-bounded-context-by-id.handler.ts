import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindBoundedContextByIdQuery } from '@app/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { DeleteBoundedContextByIdCommand } from '@app/iam/bounded-context/application/delete/delete-bounded-context-by-id.command';
import { IamBoundedContext } from '@api/graphql';
import { IamBoundedContextDto } from '../dto';

@Injectable()
export class IamDeleteBoundedContextByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamBoundedContext | IamBoundedContextDto>
    {
        const boundedContext = await this.queryBus.ask(new FindBoundedContextByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteBoundedContextByIdCommand(
            id,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return boundedContext;
    }
}