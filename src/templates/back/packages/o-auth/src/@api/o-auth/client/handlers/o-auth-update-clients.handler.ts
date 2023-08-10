import { OAuthClient, OAuthUpdateClientsInput } from '@api/graphql';
import { OAuthClientDto, OAuthUpdateClientsDto } from '@api/o-auth/client';
import { OAuthGetClientsQuery, OAuthUpdateClientsCommand } from '@app/o-auth/client';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthUpdateClientsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateClientsInput | OAuthUpdateClientsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthClient | OAuthClientDto>
    {
        await this.commandBus.dispatch(new OAuthUpdateClientsCommand(
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

        return await this.queryBus.ask(new OAuthGetClientsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
