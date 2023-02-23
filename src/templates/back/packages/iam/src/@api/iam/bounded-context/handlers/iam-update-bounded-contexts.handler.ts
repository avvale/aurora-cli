import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// auditing
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { GetBoundedContextsQuery } from '@app/iam/bounded-context/application/get/get-bounded-contexts.query';
import { UpdateBoundedContextsCommand } from '@app/iam/bounded-context/application/update/update-bounded-contexts.command';
import { IamBoundedContext, IamUpdateBoundedContextsInput } from '@api/graphql';
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
        auditing?: AuditingMeta,
    ): Promise<IamBoundedContext | IamBoundedContextDto>
    {
        await this.commandBus.dispatch(new UpdateBoundedContextsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new GetBoundedContextsQuery(queryStatement, constraint, { timezone }));
    }
}