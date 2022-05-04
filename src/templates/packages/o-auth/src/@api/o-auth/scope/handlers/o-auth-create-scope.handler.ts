import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// @apps
import { FindScopeByIdQuery } from '../../../../@apps/o-auth/scope/application/find/find-scope-by-id.query';
import { CreateScopeCommand } from '../../../../@apps/o-auth/scope/application/create/create-scope.command';
import { OAuthScope, OAuthCreateScopeInput } from '../../../../graphql';
import { OAuthScopeDto, OAuthCreateScopeDto } from '../dto';

@Injectable()
export class OAuthCreateScopeHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthCreateScopeInput | OAuthCreateScopeDto,
        timezone?: string,
    ): Promise<OAuthScope | OAuthScopeDto>
    {
        await this.commandBus.dispatch(new CreateScopeCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindScopeByIdQuery(payload.id, {}, { timezone }));
    }
}