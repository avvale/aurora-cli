import { OAuthCreateClientInput } from '@api/graphql';
import { OAuthCreateClientDto } from '@api/o-auth/client';
import { OAuthCreateClientsCommand } from '@app/o-auth/client';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthCreateClientsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: OAuthCreateClientInput[] | OAuthCreateClientDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new OAuthCreateClientsCommand(
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
