import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindScopeByIdQuery } from '@apps/o-auth/scope/application/find/find-scope-by-id.query';
import { UpdateScopeCommand } from '@apps/o-auth/scope/application/update/update-scope.command';
import { OAuthScope, OAuthUpdateScopeInput } from '../../../../graphql';
import { OAuthScopeDto, OAuthUpdateScopeDto } from '../dto';

@Injectable()
export class OAuthUpdateScopeHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateScopeInput | OAuthUpdateScopeDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthScope | OAuthScopeDto>
    {
        await this.commandBus.dispatch(new UpdateScopeCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindScopeByIdQuery(payload.id, constraint, { timezone }));
    }
}