import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// auditing
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { FindClientByIdQuery } from '@app/o-auth/client/application/find/find-client-by-id.query';
import { UpsertClientCommand } from '@app/o-auth/client/application/upsert/upsert-client.command';
import { OAuthClient, OAuthUpdateClientByIdInput } from '@api/graphql';
import { OAuthClientDto, OAuthUpdateClientByIdDto } from '../dto';

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
        await this.commandBus.dispatch(new UpsertClientCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new FindClientByIdQuery(payload.id, {}, { timezone }));
    }
}