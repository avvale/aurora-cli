import { Injectable } from '@nestjs/common';
import { ICommandBus } from 'aurora-ts-core';

// @apps
import { CreateClientsCommand } from '../../../../@apps/o-auth/client/application/create/create-clients.command';
import { OAuthCreateClientInput } from '../../../../graphql';
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
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateClientsCommand(payload, { timezone }));
        return true;
    }
}