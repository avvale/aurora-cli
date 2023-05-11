import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { CreateScopesCommand } from '@app/o-auth/scope/application/create/create-scopes.command';
import { scopes } from '@app/o-auth/scope/infrastructure/mock/mock-scope.data';

@Injectable()
export class OAuthScopeSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateScopesCommand(
            scopes,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}