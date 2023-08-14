import { OAuthClient, OAuthUpdateClientByIdInput } from '@api/graphql';
import { OAuthClientDto, OAuthUpdateClientByIdDto } from '@api/o-auth/client';
import { OAuthFindClientByIdQuery, OAuthUpsertClientCommand } from '@app/o-auth/client';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthUpsertClientHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateClientByIdInput | OAuthUpdateClientByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthClient | OAuthClientDto>
    {
        await this.commandBus.dispatch(new OAuthUpsertClientCommand(
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
