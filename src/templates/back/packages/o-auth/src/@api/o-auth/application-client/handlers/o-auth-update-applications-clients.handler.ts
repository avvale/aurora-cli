import { OAuthApplicationClient, OAuthUpdateApplicationsClientsInput } from '@api/graphql';
import { OAuthApplicationClientDto, OAuthUpdateApplicationsClientsDto } from '@api/o-auth/application-client';
import { OAuthGetApplicationsClientsQuery, OAuthUpdateApplicationsClientsCommand } from '@app/o-auth/application-client';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthUpdateApplicationsClientsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateApplicationsClientsInput | OAuthUpdateApplicationsClientsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthApplicationClient | OAuthApplicationClientDto>
    {
        await this.commandBus.dispatch(new OAuthUpdateApplicationsClientsCommand(
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

        return await this.queryBus.ask(new OAuthGetApplicationsClientsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
