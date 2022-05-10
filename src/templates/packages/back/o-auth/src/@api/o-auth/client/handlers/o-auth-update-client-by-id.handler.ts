import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindClientByIdQuery } from '@apps/o-auth/client/application/find/find-client-by-id.query';
import { UpdateClientByIdCommand } from '@apps/o-auth/client/application/update/update-client-by-id.command';
import { OAuthClient, OAuthUpdateClientByIdInput } from '../../../../graphql';
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
    ): Promise<OAuthClient | OAuthClientDto>
    {
        await this.commandBus.dispatch(new UpdateClientByIdCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindClientByIdQuery(payload.id, constraint, { timezone }));
    }
}