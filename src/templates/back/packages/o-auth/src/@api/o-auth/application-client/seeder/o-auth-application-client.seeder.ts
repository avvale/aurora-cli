import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { OAuthCreateApplicationsClientsCommand } from '@app/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';

@Injectable()
export class OAuthApplicationClientSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new OAuthCreateApplicationsClientsCommand(
            oAuthMockApplicationClientData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
