import { OAuthApplicationClient, OAuthUpdateApplicationClientByIdInput } from '@api/graphql';
import { OAuthApplicationClientDto, OAuthUpdateApplicationClientByIdDto } from '@api/o-auth/application-client';
import { OAuthFindApplicationClientByIdQuery, OAuthUpdateApplicationClientByIdCommand } from '@app/o-auth/application-client';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, diff } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthUpdateApplicationClientByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateApplicationClientByIdInput | OAuthUpdateApplicationClientByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthApplicationClient | OAuthApplicationClientDto>
    {
        const applicationClient = await this.queryBus.ask(new OAuthFindApplicationClientByIdQuery(
            payload.applicationId,
            payload.clientId,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = diff(payload, applicationClient);

        await this.commandBus.dispatch(new OAuthUpdateApplicationClientByIdCommand(
            {
                ...dataToUpdate,
                applicationId: payload.applicationId,
                clientId: payload.clientId,
            },
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new OAuthFindApplicationClientByIdQuery(
            payload.applicationId,
            payload.clientId,
            constraint,
            {
                timezone,
            },
        ));
    }
}
