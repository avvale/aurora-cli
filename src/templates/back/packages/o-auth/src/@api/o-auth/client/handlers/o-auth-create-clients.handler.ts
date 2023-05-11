import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';

// @app
import { CreateClientsCommand } from '@app/o-auth/client/application/create/create-clients.command';
import { OAuthCreateClientInput } from '@api/graphql';
import { OAuthCreateClientDto } from '../dto';

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
        await this.commandBus.dispatch(new CreateClientsCommand(
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