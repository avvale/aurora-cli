import { OAuthCreateApplicationClientInput } from '@api/graphql';
import { OAuthCreateApplicationClientDto } from '@api/o-auth/application-client';
import { OAuthCreateApplicationsClientsCommand } from '@app/o-auth/application-client';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthCreateApplicationsClientsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: OAuthCreateApplicationClientInput[] | OAuthCreateApplicationClientDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new OAuthCreateApplicationsClientsCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return true;
    }
}
