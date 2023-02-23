import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// auditing
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { GetClientsQuery } from '@app/o-auth/client/application/get/get-clients.query';
import { DeleteClientsCommand } from '@app/o-auth/client/application/delete/delete-clients.command';
import { OAuthClient } from '@api/graphql';
import { OAuthClientDto } from '../dto';

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
        const clients = await this.queryBus.ask(new GetClientsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteClientsCommand(
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