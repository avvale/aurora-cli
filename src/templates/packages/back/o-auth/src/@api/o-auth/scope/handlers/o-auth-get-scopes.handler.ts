import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetScopesQuery } from '@app/o-auth/scope/application/get/get-scopes.query';
import { OAuthScope } from '@api/graphql';
import { OAuthScopeDto } from '../dto';

@Injectable()
export class OAuthGetScopesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthScope[] | OAuthScopeDto[]>
    {
        return await this.queryBus.ask(new GetScopesQuery(queryStatement, constraint, { timezone }));
    }
}