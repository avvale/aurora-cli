import { OAuthApplicationClient } from '@api/graphql';
import { OAuthApplicationClientDto } from '@api/o-auth/application-client';
import {
    OAuthDeleteApplicationClientByIdCommand,
    OAuthFindApplicationClientByIdQuery,
} from '@app/o-auth/application-client';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthDeleteApplicationClientByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        applicationId: string,
        clientId: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthApplicationClient | OAuthApplicationClientDto> {
        const applicationClient = await this.queryBus.ask(
            new OAuthFindApplicationClientByIdQuery(
                applicationId,
                clientId,
                constraint,
                {
                    timezone,
                },
            ),
        );

        await this.commandBus.dispatch(
            new OAuthDeleteApplicationClientByIdCommand(
                applicationId,
                clientId,
                constraint,
                {
                    timezone,
                    repositoryOptions: {
                        auditing,
                    },
                },
            ),
        );

        return applicationClient;
    }
}
