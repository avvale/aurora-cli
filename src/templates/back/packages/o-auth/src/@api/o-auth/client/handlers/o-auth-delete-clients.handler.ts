import { OAuthClient } from '@api/graphql';
import { OAuthClientDto } from '@api/o-auth/client';
import { OAuthDeleteClientsCommand, OAuthGetClientsQuery } from '@app/o-auth/client';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthDeleteClientsHandler
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
    ): Promise<OAuthClient[] | OAuthClientDto[]>
    {
        const clients = await this.queryBus.ask(new OAuthGetClientsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new OAuthDeleteClientsCommand(
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return clients;
    }
}
