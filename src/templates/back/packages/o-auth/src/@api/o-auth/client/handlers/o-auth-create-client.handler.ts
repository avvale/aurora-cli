import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurora-ts/core';

// @app
import { FindClientByIdQuery } from '@app/o-auth/client/application/find/find-client-by-id.query';
import { CreateClientCommand } from '@app/o-auth/client/application/create/create-client.command';
import { OAuthClient, OAuthCreateClientInput } from '@api/graphql';
import { OAuthClientDto, OAuthCreateClientDto } from '../dto';

@Injectable()
export class OAuthCreateClientHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthCreateClientInput | OAuthCreateClientDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthClient | OAuthClientDto>
    {
        await this.commandBus.dispatch(new CreateClientCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new FindClientByIdQuery(
            payload.id,
            {},
            { timezone },
        ));
    }
}