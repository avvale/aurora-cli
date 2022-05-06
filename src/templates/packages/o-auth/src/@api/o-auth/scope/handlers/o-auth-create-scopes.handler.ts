import { Injectable } from '@nestjs/common';
import { ICommandBus } from 'aurora-ts-core';

// @apps
import { CreateScopesCommand } from '../../../../@apps/o-auth/scope/application/create/create-scopes.command';
import { OAuthCreateScopeInput } from '../../../../graphql';
import { OAuthCreateScopeDto } from '../dto';

@Injectable()
export class OAuthCreateScopesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: OAuthCreateScopeInput[] | OAuthCreateScopeDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateScopesCommand(payload, { timezone }));
        return true;
    }
}