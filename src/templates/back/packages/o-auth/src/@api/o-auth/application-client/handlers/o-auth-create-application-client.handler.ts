import {
    OAuthApplicationClient,
    OAuthCreateApplicationClientInput,
} from '@api/graphql';
import {
    OAuthApplicationClientDto,
    OAuthCreateApplicationClientDto,
} from '@api/o-auth/application-client';
import {
    OAuthCreateApplicationClientCommand,
    OAuthFindApplicationClientByIdQuery,
} from '@app/o-auth/application-client';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthCreateApplicationClientHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload:
            | OAuthCreateApplicationClientInput
            | OAuthCreateApplicationClientDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthApplicationClient | OAuthApplicationClientDto> {
        await this.commandBus.dispatch(
            new OAuthCreateApplicationClientCommand(payload, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return await this.queryBus.ask(
            new OAuthFindApplicationClientByIdQuery(
                payload.applicationId,
                payload.clientId,
                {},
                {
                    timezone,
                },
            ),
        );
    }
}
