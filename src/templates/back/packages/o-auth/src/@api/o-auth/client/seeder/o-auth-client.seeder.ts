import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { OAuthCreateClientsCommand } from '@app/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';

@Injectable()
export class OAuthClientSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new OAuthCreateClientsCommand(
            oAuthMockClientData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
