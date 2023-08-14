import { IamBoundedContext, IamUpdateBoundedContextsInput } from '@api/graphql';
import { IamBoundedContextDto, IamUpdateBoundedContextsDto } from '@api/iam/bounded-context';
import { IamGetBoundedContextsQuery, IamUpdateBoundedContextsCommand } from '@app/iam/bounded-context';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        await this.commandBus.dispatch(new IamUpdateBoundedContextsCommand(
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

        return await this.queryBus.ask(new IamGetBoundedContextsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
