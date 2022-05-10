import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetScopesQuery } from '@apps/o-auth/scope/application/get/get-scopes.query';
import { UpdateScopesCommand } from '@apps/o-auth/scope/application/update/update-scopes.command';
import { OAuthScope, OAuthUpdateScopesInput } from '../../../../graphql';
import { OAuthScopeDto, OAuthUpdateScopesDto } from '../dto';

@Injectable()
export class OAuthUpdateScopesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateScopesInput | OAuthUpdateScopesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthScope | OAuthScopeDto>
    {
        await this.commandBus.dispatch(new UpdateScopesCommand(payload, queryStatement, constraint, { timezone }));

        return await this.queryBus.ask(new GetScopesQuery(queryStatement, constraint, { timezone }));
    }
}