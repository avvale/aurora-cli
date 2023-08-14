import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { OAuthCreateApplicationsCommand } from '@app/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';

@Injectable()
export class OAuthApplicationSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new OAuthCreateApplicationsCommand(
            oAuthMockApplicationData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
