import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';

// @app
import { FindClientByIdQuery } from '@app/o-auth/client/application/find/find-client-by-id.query';
import { UpdateClientByIdCommand } from '@app/o-auth/client/application/update/update-client-by-id.command';
import { OAuthClient, OAuthUpdateClientByIdInput } from '@api/graphql';
import { OAuthClientDto, OAuthUpdateClientByIdDto } from '../dto';

@Injectable()
export class OAuthUpdateClientByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateClientByIdInput | OAuthUpdateClientByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthClient | OAuthClientDto>
    {
        const client = await this.queryBus.ask(new FindClientByIdQuery(
            payload.id,
            constraint,
            { timezone },
        ));

        const dataToUpdate = Utils.diff(payload, client);

        await this.commandBus.dispatch(new UpdateClientByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new FindClientByIdQuery(
            payload.id,
            constraint,
            { timezone },
        ));
    }
}