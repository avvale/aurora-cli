import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetScopesQuery } from '@apps/o-auth/scope/application/get/get-scopes.query';
import { DeleteScopesCommand } from '@apps/o-auth/scope/application/delete/delete-scopes.command';
import { OAuthScope } from '../../../../graphql';
import { OAuthScopeDto } from '../dto';

@Injectable()
export class OAuthDeleteScopesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthScope[] | OAuthScopeDto[]>
    {
        const scopes = await this.queryBus.ask(new GetScopesQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteScopesCommand(queryStatement, constraint, { timezone }));

        return scopes;
    }
}