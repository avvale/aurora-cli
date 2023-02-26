import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

//
import { CreateClientsCommand } from '@app/o-auth/client/application/create/create-clients.command';
import { clients } from '@app/o-auth/client/infrastructure/mock/mock-client.data';

@Injectable()
export class OAuthClientSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateClientsCommand(
            clients,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}