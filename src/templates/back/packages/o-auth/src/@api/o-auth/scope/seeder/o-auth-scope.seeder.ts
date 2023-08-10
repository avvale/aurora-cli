import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { OAuthCreateScopesCommand } from '@app/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';

@Injectable()
export class OAuthScopeSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new OAuthCreateScopesCommand(
            oAuthMockScopeData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
