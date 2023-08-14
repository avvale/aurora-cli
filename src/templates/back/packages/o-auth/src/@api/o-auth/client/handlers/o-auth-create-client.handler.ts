import { OAuthClient, OAuthCreateClientInput } from '@api/graphql';
import { OAuthClientDto, OAuthCreateClientDto } from '@api/o-auth/client';
import { OAuthCreateClientCommand, OAuthFindClientByIdQuery } from '@app/o-auth/client';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        await this.commandBus.dispatch(new OAuthCreateClientCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new OAuthFindClientByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
